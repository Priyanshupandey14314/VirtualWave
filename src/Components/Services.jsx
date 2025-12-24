
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ServiceModal from './ServiceModal';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [selectedService, setSelectedService] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch Services from API
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
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

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

    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation Logic
  const maxIndex = Math.max(0, services.length - itemsToShow);

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

  // Helper to resolve image path
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `http://localhost/virtual_wave_api/${path.replace(/\\/g, '/')}`;
  };

  return (
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

        {/* Carousel Wrapper */}
        {services.length > 0 ? (
          <div className="carousel-wrapper">

            <button className="nav-btn prev-btn" onClick={prevSlide}>&#8592;</button>

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
                {services.map((service, index) => (
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
                            src={getImageUrl(service.image.startsWith('uploads') ? `/${service.image}` : service.image)}
                            alt={service.title}
                            className="card-image-top"
                            onError={(e) => { e.target.style.display = 'none' }}
                          />
                        ) : (
                          <div className="placeholder-image" style={{ backgroundColor: service.color || '#007bff' }}></div>
                        )}
                      </div>

                      <div className="card-content">
                        <h3 className="card-title">{service.title}</h3>
                        <p className="card-description">
                          {service.description.length > 80
                            ? service.description.substring(0, 80) + '...'
                            : service.description}
                        </p>

                        {/* Features List */}
                        <div className="card-features-list">
                          {Array.isArray(service.features) && service.features.slice(0, 2).map((feature, idx) => (
                            <span key={idx} className="feature-pill">{feature}</span>
                          ))}
                        </div>

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

            <button className="nav-btn next-btn" onClick={nextSlide}>&#8594;</button>
          </div>
        ) : (
          <div className="loading-state">Loading services...</div>
        )}

        {/* Pagination Dots */}
        {services.length > itemsToShow && (
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
      {/* Full Page Service Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

export default Services;