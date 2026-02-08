
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ServiceModal from './ServiceModal';
import Loader from './Loader';
import './Services.css';
import { API_BASE_URL, getImageUrl } from '../config';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [selectedService, setSelectedService] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const categories = [
    { id: 'All', label: 'All Services' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'advertising', label: 'Advertising' },
    { id: 'technical', label: 'Technical' },
    { id: 'packages', label: 'Packages' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'tools', label: 'Tools/Software' },
    { id: 'vip', label: 'VIP' }
  ];

  // Fetch Services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services.php`);
        if (Array.isArray(response.data)) {
          setServices(response.data);
          setFilteredServices(response.data);
        } else {
          console.error('API returned non-array data:', response.data);
          setServices([]);
          setFilteredServices([]);
        }
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  // Fast Filter Logic
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service =>
        service.category && service.category.toLowerCase() === activeCategory.toLowerCase()
      ));
    }
    setCurrentIndex(0); // Reset carousel when filtering
  }, [activeCategory, services]);

  // Handle Responsive Slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1200) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation Logic
  const maxIndex = Math.max(0, filteredServices.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch Swipe Support
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <section className="services-section" id="services"
      style={{}}>
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

        {/* Category Filter */}
        <div className="category-filter-container">
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Wrapper */}
        {filteredServices.length > 0 ? (
          <div className="carousel-wrapper">

            <button className="nav-btn prev-btn" onClick={prevSlide} disabled={filteredServices.length <= itemsToShow}>&#8592;</button>

            <div
              className="carousel-viewport"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
                }}
              >
                {filteredServices.map((service, index) => (
                  <div
                    key={service._id || index}
                    className="carousel-slide"
                    style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                  >
                    <div
                      className="service-card"
                      style={{ '--neon-color': service.color || '#4f46e5' }}
                      onClick={() => setSelectedService(service)}
                    >
                      {/* Image Top Half */}
                      <div className="card-image-wrapper">
                        {service.image ? (
                          <img
                            src={getImageUrl(service.image)}
                            alt={service.title}
                            className="card-image-top"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        ) : (
                          <div className="placeholder-image" style={{ backgroundColor: service.color || '#007bff' }}></div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="card-divider" style={{
                        width: '60%',
                        height: '1px',
                        background: 'var(--border-color)',
                        margin: '0 auto 15px'
                      }}></div>

                      <div className="card-content">
                        <h3 className="card-title">{service.title}</h3>
                        <p className="card-description">
                          {service.description}
                        </p>

                        <button className="card-button" style={{ marginTop: 'auto' }}>
                          <span>Learn More</span>
                          <svg className="arrow-icon" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="nav-btn next-btn" onClick={nextSlide} disabled={filteredServices.length <= itemsToShow}>&#8594;</button>
          </div>
        ) : (
          <div className="no-services-found">
            {services.length === 0 ? <Loader /> : <p>No services found in this category.</p>}
          </div>
        )}


        {/* Pagination Dots */}
        {filteredServices.length > itemsToShow && (
          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Page Service Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default Services;