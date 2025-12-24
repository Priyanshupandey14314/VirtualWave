import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BackgroundShapes from '../Components/BackgroundShapes';
import './Services.css';
import ServiceModal from '../Components/ServiceModal';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost/virtual_wave_api/services.php');
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error('API returned non-array data:', response.data);
          setServices([]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    { id: 'marketing', name: 'Digital Marketing', count: services.filter(s => s.category === 'marketing').length },
    { id: 'creative', name: 'Creative Services', count: services.filter(s => s.category === 'creative').length },
    { id: 'technical', name: 'Technical Services', count: services.filter(s => s.category === 'technical').length }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <BackgroundShapes />
      <CustomNavbar />
      <section className="services-section" id="services">
        <div className="services-container">
          {/* Header */}
          <div className="services-header">
            <h2 className="services-title">
              Our <span className="gradient-text-services">Services</span>
            </h2>
            <p className="services-subtitle">
              Comprehensive digital marketing solutions to elevate your business
            </p>
          </div>

          <div className="services-layout">
            {/* Sidebar */}
            <aside className="services-sidebar">
              {/* Search */}
              <div className="sidebar-search">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Categories */}
              <div className="sidebar-categories">
                <h3 className="sidebar-title">Categories</h3>
                <ul className="category-list">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="category-name">{category.name}</span>
                        <span className="category-count">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="sidebar-cta">
                <h3 className="cta-title">Need Custom Solution?</h3>
                <p className="cta-text">Let's discuss your specific requirements and create a tailored solution for your business.</p>
                <button className="cta-btn">Get Quote</button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="services-main">
              <div className="services-results">
                <p className="results-count">
                  Showing {filteredServices.length} of {services.length} services
                </p>
              </div>

              <div className="services-grid">
                {filteredServices.map(service => (
                  <div key={service._id} className="service-card-detailed">
                    <div className="service-card-header">
                      <div className="service-icon-large" style={{ background: service.color + '20', color: service.color }}>
                        {service.image ? <img src={`http://localhost/virtual_wave_api/${service.image}`} alt={service.title} style={{ width: '50px', height: '50px' }} /> : service.icon}
                      </div>
                      <div className="service-category-tag" style={{ background: service.color }}>
                        {service.category}
                      </div>
                    </div>

                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-description">{service.description}</p>

                      <div className="service-features">
                        <h4 className="features-title">Key Features:</h4>
                        <ul className="features-list">
                          {service.features.map((feature, index) => (
                            <li key={index} className="feature-item">{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="service-card-footer">
                      <button
                        className="service-learn-more"
                        style={{ color: service.color }}
                        onClick={() => setSelectedService(service)}
                      >
                        Learn More
                        <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="no-results">
                  <p>No services found matching your criteria.</p>
                  <button onClick={() => { setSelectedCategory('all'); setSearchTerm(''); }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>

        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      </section>
    </>
  );
};
export default Services;