import React, { useState } from 'react';
import CustomNavbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import BackgroundShapes from '../Components/BackgroundShapes';
import './Services.css';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: 1,
      icon: '📱',
      title: 'Social Media Marketing',
      category: 'marketing',
      description: 'Comprehensive social media strategies including Instagram, Facebook, LinkedIn marketing and ads management to boost your brand presence.',
      features: ['Content Creation', 'Community Management', 'Ads Optimization', 'Analytics & Reporting'],
      color: '#007bff'
    },
    {
      id: 2,
      icon: '💰',
      title: 'Paid Ads',
      category: 'marketing',
      description: 'Maximize ROI with expert management of Meta Ads and Google Ads campaigns tailored to your business goals.',
      features: ['Campaign Strategy', 'Ad Creation', 'Budget Optimization', 'Performance Tracking'],
      color: '#17a2b8'
    },
    {
      id: 3,
      icon: '💬',
      title: 'WhatsApp Marketing',
      category: 'marketing',
      description: 'Reach your audience directly through bulk messaging, automated campaigns, WhatsApp software and API integration solutions.',
      features: ['Bulk Messaging', 'Automated Campaigns', 'API Integration', 'CRM Integration'],
      color: '#0056b3'
    },
    {
      id: 4,
      icon: '🎯',
      title: 'Lead Generation',
      category: 'marketing',
      description: 'Quality leads with B2B/B2C options, global and Pan India databases, city-wise and pin code-wise targeting for maximum conversions.',
      features: ['Database Building', 'Lead Qualification', 'CRM Integration', 'Conversion Tracking'],
      color: '#138496'
    },
    {
      id: 5,
      icon: '🎬',
      title: 'Video Editing',
      category: 'creative',
      description: 'Professional video production including promotional videos, reels/shorts, corporate videos and animated explainers.',
      features: ['Video Production', 'Motion Graphics', 'Color Grading', 'Sound Design'],
      color: '#0066cc'
    },
    {
      id: 6,
      icon: '🎨',
      title: 'Graphic Designing',
      category: 'creative',
      description: 'Creative designs for posters, banners, thumbnails, flyers, social media posts, packaging and logo design.',
      features: ['Logo Design', 'Brand Identity', 'Print Design', 'Digital Graphics'],
      color: '#007bff'
    },
    {
      id: 7,
      icon: '🔍',
      title: 'SEO Services',
      category: 'technical',
      description: 'Boost your search rankings with on-page, off-page, technical and local SEO strategies for better visibility.',
      features: ['Keyword Research', 'On-page Optimization', 'Link Building', 'Technical SEO'],
      color: '#17a2b8'
    },
    {
      id: 8,
      icon: '✍️',
      title: 'Content Writing Services',
      category: 'creative',
      description: 'Engaging content for websites, blogs, social media, ad copies, product descriptions and LinkedIn ghost writing.',
      features: ['Blog Writing', 'Copywriting', 'Social Media Content', 'SEO Content'],
      color: '#0056b3'
    },
    {
      id: 9,
      icon: '🌐',
      title: 'Website Design & Development',
      category: 'technical',
      description: 'Custom websites including business sites, e-commerce platforms, portfolios, landing pages and website redesigns.',
      features: ['Custom Development', 'E-commerce Solutions', 'Responsive Design', 'CMS Integration'],
      color: '#138496'
    }
  ];

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
                <div key={service.id} className="service-card-detailed">
                  <div className="service-card-header">
                    <div className="service-icon-large" style={{background: service.color + '20', color: service.color}}>
                      {service.icon}
                    </div>
                    <div className="service-category-tag" style={{background: service.color}}>
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
                    <button className="service-learn-more" style={{color: service.color}}>
                      Learn More
                      <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="no-results">
                <p>No services found matching your criteria.</p>
                <button onClick={() => {setSelectedCategory('all'); setSearchTerm('');}}>
                  Clear Filters
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

export default Services;