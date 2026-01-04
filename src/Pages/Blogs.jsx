import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Sidebar from "../Components/Sidebar";

import './Blogs.css';
import { API_BASE_URL, getImageUrl } from '../config';


const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ... fetchBlogs effect
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs.php`);
        if (Array.isArray(response.data)) {
          setBlogPosts(response.data);
        } else {
          console.error('API returned non-array data:', response.data);
          setBlogPosts([]);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ... categories logic
  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'marketing', name: 'Marketing', count: blogPosts.filter(p => p.category === 'marketing').length },
    { id: 'advertising', name: 'Advertising', count: blogPosts.filter(p => p.category === 'advertising').length },
    { id: 'content', name: 'Content', count: blogPosts.filter(p => p.category === 'content').length },
    { id: 'technology', name: 'Technology', count: blogPosts.filter(p => p.category === 'technology').length },
    { id: 'seo', name: 'SEO', count: blogPosts.filter(p => p.category === 'seo').length },
    { id: 'branding', name: 'Branding', count: blogPosts.filter(p => p.category === 'branding').length },
    { id: 'sales', name: 'Sales', count: blogPosts.filter(p => p.category === 'sales').length },
    { id: 'design', name: 'Design', count: blogPosts.filter(p => p.category === 'design').length }
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  if (loading) return (
    <>
      <CustomNavbar />
      <Loader />
      <Footer />
    </>
  );

  return (
    <>

      <CustomNavbar />
      <section className="blogs-section">
        <div className="blogs-container">
          <div className="blogs-header">
            <h1 className="blogs-title">
              Our <span className="gradient-text-blogs">Blog</span>
            </h1>
            <p className="blogs-subtitle">
              Insights, trends, and expert advice on digital marketing and business growth
            </p>
          </div>

          <div className="blogs-content">
            {/* Helper Button to Open Sidebar */}
            <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
              <i className="bi bi-funnel"></i>
            </button>

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
              <div className="sidebar-categories">
                <h3 className="sidebar-title">Categories</h3>
                <ul className="category-list">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsSidebarOpen(false); // Close sidebar on selection
                        }}
                      >
                        <span className="category-name">{category.name}</span>
                        <span className="category-count">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-featured">
                <h3 className="sidebar-title">Featured Topics</h3>
                <div className="featured-tags">
                  {['Digital Marketing', 'SEO', 'Social Media', 'Content Strategy', 'PPC Advertising'].map(tag => (
                    <span key={tag} className="tag-item">{tag}</span>
                  ))}
                </div>
              </div>
            </Sidebar>

            <main className="blogs-main">
              {/* ... main content */}
              <div className="posts-count">
                <p>Showing {filteredPosts.length} of {blogPosts.length} articles</p>
              </div>

              <div className="blog-posts-grid">
                {filteredPosts.map(post => (
                  <article key={post.id} className="blog-post-card">
                    <div className="post-image">
                      <div className="image-placeholder">
                        {post.image ? (
                          <img
                            src={getImageUrl(post.image)}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="fallback-img">VirtualWave</div>' }}
                          />
                        ) : (
                          <div className="fallback-img">VirtualWave</div>
                        )}
                      </div>
                    </div>

                    <div className="post-content">
                      <div className="post-category">
                        <span className="category-badge">{post.category}</span>
                      </div>

                      <h2 className="post-title">{post.title}</h2>
                      <p className="post-excerpt">{post.excerpt}</p>

                      <div className="post-meta">
                        <div className="meta-info">
                          <span className="author">By {post.author}</span>
                          <span className="date">{new Date(post.created_at || Date.now()).toLocaleDateString()}</span>
                          <span className="read-time">{post.readTime}</span>
                        </div>
                      </div>

                      <button
                        className="read-more-btn"
                        onClick={() => navigate(`/blogs/${post.id}`)}
                      >
                        Read More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="no-posts">
                  <p>No articles found in this category.</p>
                  <button onClick={() => setSelectedCategory('all')}>
                    View All Posts
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogsPage;