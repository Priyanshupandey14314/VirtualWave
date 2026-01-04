import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API_BASE_URL, getImageUrl } from '../config';
import logo from '../assets/logo.png';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin');

    const fetchData = async () => {
      try {
        const [servicesRes, blogsRes, messagesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/services.php`),
          axios.get(`${API_BASE_URL}/blogs.php`),
          axios.get(`${API_BASE_URL}/messages.php`)
        ]);
        setServices(servicesRes.data);
        setBlogs(blogsRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [navigate]);

  const refetchData = async () => {
    try {
      const [servicesRes, blogsRes, messagesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/services.php`),
        axios.get(`${API_BASE_URL}/blogs.php`),
        axios.get(`${API_BASE_URL}/messages.php`)
      ]);
      setServices(servicesRes.data);
      setBlogs(blogsRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_BASE_URL}/services.php?id=${id}`); // PHP delete via query param
        refetchData();
      } catch {
        alert('Error deleting service');
      }
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`${API_BASE_URL}/blogs.php?id=${id}`);
        refetchData();
      } catch {
        alert('Error deleting blog');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div
            onClick={() => navigate('/')}
            title="Go to Home"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img src={logo} alt="VirtualWave" style={{ height: '40px', width: 'auto' }} />
          </div>
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700, color: '#1e293b' }}>VirtualWave Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <button
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveSection('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={activeSection === 'services' ? 'active' : ''}
            onClick={() => setActiveSection('services')}
          >
            🛠️ Services
          </button>
          <button
            className={activeSection === 'blogs' ? 'active' : ''}
            onClick={() => setActiveSection('blogs')}
          >
            ✍️ Blogs
          </button>
          <button
            className={activeSection === 'messages' ? 'active' : ''}
            onClick={() => setActiveSection('messages')}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span>💬 Messages</span>
            {messages.filter(m => m.is_read == 0).length > 0 && (
              <span className="badge" style={{
                background: '#ef4444',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '0.8rem'
              }}>
                {messages.filter(m => m.is_read == 0).length}
              </span>
            )}
          </button>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
            {/* Navbar Notification */}
            {messages.filter(m => m.is_read == 0).length > 0 && (
              <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveSection('messages')}>
                <span style={{ fontSize: '1.5rem' }}>🔔</span>
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#ef4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '0.7rem'
                }}>
                  {messages.filter(m => m.is_read == 0).length}
                </span>
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </header>

        <main className="admin-content">
          {activeSection === 'dashboard' && <DashboardOverview services={services} blogs={blogs} />}
          {activeSection === 'services' && (
            <ServicesManagement
              services={services}
              onDelete={handleDeleteService}
              fetchData={refetchData}
            />
          )}
          {activeSection === 'blogs' && (
            <BlogsManagement
              blogs={blogs}
              onDelete={handleDeleteBlog}
              fetchData={refetchData}
            />
          )}
          {activeSection === 'messages' && (
            <MessagesManagement
              messages={messages}
              fetchData={refetchData}
            />
          )}
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = ({ services, blogs }) => (
  <div className="dashboard-overview">
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Services</h3>
        <p className="stat-number">{services.length}</p>
      </div>
      <div className="stat-card">
        <h3>Total Blogs</h3>
        <p className="stat-number">{blogs.length}</p>
      </div>
    </div>
    <div className="recent-activity">
      <h3>Recent Services</h3>
      <ul>
        {services.slice(0, 5).map(service => (
          <li key={service._id}>{service.title}</li>
        ))}
      </ul>
      <h3>Recent Blogs</h3>
      <ul>
        {blogs.slice(0, 5).map(blog => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ServicesManagement = ({ services, onDelete, fetchData }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    icon: '',
    features: '',
    image: null
  });

  const handleEdit = (service) => {
    setEditingId(service.id || service._id);
    setFormData({
      title: service.title,
      description: service.description,
      detailedDescription: service.detailedDescription || '',
      category: service.category,
      icon: service.icon || '',
      features: Array.isArray(service.features) ? service.features.join(', ') : service.features,
      image: null // Keep null, only update if new image selected
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailedDescription: '',
      category: '',
      icon: '',
      features: '',
      image: null
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (editingId) {
      data.append('id', editingId);
    }

    Object.keys(formData).forEach(key => {
      if (key === 'image' && formData[key]) {
        data.append(key, formData[key]);
      } else if (key !== 'image') {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post(`${API_BASE_URL}/services.php`, data);
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error saving service: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="management-section">
      <div className="section-header">
        <h2>Services Management</h2>
        <button onClick={() => {
          if (showForm) resetForm();
          else setShowForm(true);
        }} className="add-btn">
          {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
          <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h3>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                <option value="marketing">Marketing</option>
                <option value="creative">Creative</option>
                <option value="technical">Technical</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description (Short)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Detailed Description (Full Page Content)</label>
            <textarea
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              className="admin-textarea"
              rows="10"
              placeholder="Enter detailed description here (HTML tags allowed)..."
              style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>

          <div className="form-group">
            <label>Features (comma separated, optional)</label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Feature 1, Feature 2, Feature 3"
            />
          </div>

          <div className="form-group">
            <label>Image {editingId && '(Leave empty to keep current)'}</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              accept="image/*"
            />
          </div>
          <button type="submit" className="submit-btn">{editingId ? 'Update Service' : 'Add Service'}</button>
        </form>
      )}

      <div className="items-list">
        {services.map(service => (
          <div key={service._id || service.id} className="item-card">
            <div className="item-info">
              {service.image && <img src={getImageUrl(service.image)} alt={service.title} className="item-thumbnail" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />}
              <h4>{service.title}</h4>
              <p>{service.category}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(service)} className="btn  edit-btn" style={{ padding: '0.4rem 0.8rem', border: '1px solid #4f46e5', color: '#4f46e5', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                <i className="bi bi-pencil-square"></i>
              </button>
              <button onClick={() => onDelete(service._id || service.id)} className="delete-btn">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogsManagement = ({ blogs, onDelete, fetchData }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    readTime: '',
    tags: '',
    image: null
  });

  const handleEdit = (blog) => {
    setEditingId(blog.id || blog._id);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author,
      readTime: blog.readTime,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags,
      image: null
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({ title: '', excerpt: '', content: '', category: '', author: '', readTime: '', tags: '', image: null });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (editingId) {
      data.append('id', editingId);
    }

    Object.keys(formData).forEach(key => {
      if (key === 'tags') data.append(key, formData[key]);
      else if (key === 'image' && formData[key]) data.append(key, formData[key]);
      else if (key !== 'image') data.append(key, formData[key]);
    });

    try {
      await axios.post(`${API_BASE_URL}/blogs.php`, data);
      resetForm();
      fetchData();
    } catch {
      alert('Error saving blog');
    }
  };

  return (
    <div className="management-section">
      <div className="section-header">
        <h2>Blogs Management</h2>
        <button onClick={() => {
          if (showForm) resetForm();
          else setShowForm(true);
        }} className="add-btn">
          {showForm ? 'Cancel' : 'Add Blog'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
          <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>
            {editingId ? 'Edit Blog' : 'Add New Blog'}
          </h3>
          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Excerpt</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Content (Rich Text disabled temporarily)</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows="15"
              placeholder="Enter HTML or text content..."
              style={{ width: '100%', padding: '10px' }}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="5 min read"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Tag 1, Tag 2, Tag 3"
            />
          </div>
          <div className="form-group">
            <label>Image {editingId && '(Leave empty to keep current)'}</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              accept="image/*"
            />
          </div>
          <button type="submit" className="submit-btn">{editingId ? 'Update Blog' : 'Add Blog'}</button>
        </form>
      )}

      <div className="items-list">
        {blogs.map(blog => (
          <div key={blog._id || blog.id} className="item-card">
            <div className="item-info">
              {blog.image && <img src={getImageUrl(blog.image)} alt={blog.title} className="item-thumbnail" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />}
              <h4>{blog.title}</h4>
              <p>{blog.author} • {blog.category}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(blog)} className="btn btn-sm" style={{ padding: '0.4rem 0.8rem', border: '1px solid #4f46e5', color: '#4f46e5', background: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                <i className="bi bi-pencil-square"></i>
              </button>
              <button onClick={() => onDelete(blog._id || blog.id)} className="delete-btn">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessagesManagement = ({ messages, fetchData }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleMarkRead = async (id, currentStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/messages.php`, { id, is_read: !currentStatus });
      fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await axios.delete(`${API_BASE_URL}/messages.php?id=${id}`);
        fetchData();
      } catch (err) {
        alert('Error deleting message');
      }
    }
  };

  return (
    <div className="management-section">
      <div className="section-header">
        <h2>Messages ({messages.filter(m => m.is_read == 0).length} New)</h2>
        <button onClick={fetchData} className="add-btn" style={{ background: '#64748b' }}>
          Refresh
        </button>
      </div>

      <div className="items-list">
        {messages.length === 0 ? <p>No messages found.</p> : messages.map(msg => (
          <div key={msg.id} className="item-card" style={{
            borderLeft: msg.is_read == 0 ? '4px solid #ef4444' : '4px solid transparent',
            background: msg.is_read == 0 ? '#fef2f2' : 'white'
          }}>
            <div className="item-info" style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0 }}>
                  {msg.service_title || 'General Enquiry'}
                  {msg.service_category && <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#64748b', marginLeft: '8px' }}>({msg.service_category})</span>}
                </h4>
                <small style={{ color: '#64748b' }}>{new Date(msg.created_at).toLocaleString()}</small>
              </div>
              <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{msg.user_email}</p>
              <p style={{
                color: '#334155',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '500px'
              }}>
                {msg.message}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', justifyContent: 'center' }}>
              <button
                onClick={() => setSelectedMessage(msg)}
                className="btn"
                title="View Details"
                style={{
                  padding: '0.4rem',
                  border: '1px solid #cbd5e1',
                  color: '#4f46e5',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                👁️
              </button>
              <button
                onClick={() => handleMarkRead(msg.id, msg.is_read)}
                className="btn"
                title={msg.is_read == 1 ? "Mark Unread" : "Mark Read"}
                style={{
                  padding: '0.4rem',
                  border: '1px solid #cbd5e1',
                  color: msg.is_read == 1 ? '#64748b' : '#ef4444',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {msg.is_read == 1 ? '📩' : '✅'}
              </button>
              <button onClick={() => handleDelete(msg.id)} className="delete-btn" title="Delete">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div className="service-modal-overlay" onClick={() => setSelectedMessage(null)} style={{ zIndex: 1000 }}>
          <div className="service-modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
            <button className="modal-close-btn" onClick={() => setSelectedMessage(null)}>&times;</button>
            <h2 className="modal-title" style={{ marginBottom: '0.5rem' }}>Message Details</h2>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>From Service:</p>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                {selectedMessage.service_title}
                {selectedMessage.service_category && <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '10px' }}>({selectedMessage.service_category})</span>}
              </h4>

              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Sender:</p>
              <p style={{ marginTop: 0, fontWeight: 'bold' }}>{selectedMessage.user_email}</p>

              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Date:</p>
              <p style={{ marginTop: 0 }}>{new Date(selectedMessage.created_at).toLocaleString()}</p>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Message:</p>
            <div style={{
              background: '#f8fafc',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              whiteSpace: 'pre-wrap',
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {selectedMessage.message}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  handleMarkRead(selectedMessage.id, selectedMessage.is_read);
                  setSelectedMessage(null);
                }}
                className="action-btn"
                style={{ background: selectedMessage.is_read == 0 ? '#10b981' : '#64748b', color: 'white' }}
              >
                {selectedMessage.is_read == 0 ? 'Mark as Read' : 'Mark as Unread'}
              </button>
              <a href={`mailto:${selectedMessage.user_email}`} className="action-btn btn-contact">
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;