import React, { useState, useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const services = [
    {
      icon: '📱',
      title: 'Social Media Marketing',
      description: 'Comprehensive social media strategies including Instagram, Facebook, LinkedIn marketing and ads management to boost your brand presence.',
      color: '#ec4899'
    },
    {
      icon: '💰',
      title: 'Paid Ads',
      description: 'Maximize ROI with expert management of Meta Ads and Google Ads campaigns tailored to your business goals.',
      color: '#8b5cf6'
    },
    {
      icon: '💬',
      title: 'WhatsApp Marketing',
      description: 'Reach your audience directly through bulk messaging, automated campaigns, WhatsApp software and API integration solutions.',
      color: '#22c55e'
    },
    {
      icon: '🎯',
      title: 'Lead Generation',
      description: 'Quality leads with B2B/B2C options, global and Pan India databases, city-wise and pin code-wise targeting for maximum conversions.',
      color: '#f59e0b'
    },
    {
      icon: '🎬',
      title: 'Video Editing',
      description: 'Professional video production including promotional videos, reels/shorts, corporate videos and animated explainers.',
      color: '#ef4444'
    },
    {
      icon: '🎨',
      title: 'Graphic Designing',
      description: 'Creative designs for posters, banners, thumbnails, flyers, social media posts, packaging and logo design.',
      color: '#3b82f6'
    },
    {
      icon: '🔍',
      title: 'SEO Services',
      description: 'Boost your search rankings with on-page, off-page, technical and local SEO strategies for better visibility.',
      color: '#6366f1'
    },
    {
      icon: '✍️',
      title: 'Content Writing Services',
      description: 'Engaging content for websites, blogs, social media, ad copies, product descriptions and LinkedIn ghost writing.',
      color: '#14b8a6'
    },
    {
      icon: '🌐',
      title: 'Website Design & Development',
      description: 'Custom websites including business sites, e-commerce platforms, portfolios, landing pages and website redesigns.',
      color: '#d946ef'
    }
  ];

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
  const maxIndex = services.length - itemsToShow;

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
        <div className="carousel-wrapper">
          
          {/* Navigation Buttons */}
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
                  key={index} 
                  className="carousel-slide"
                  style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                >
                  <div 
                    className="service-card"
                    style={{ 
                      '--neon-color': service.color,
                    }}
                  >
                    <div className="card-bg-glow"></div>
                    <div className="card-content">
                      <div className="card-icon-wrapper" style={{background: service.color + '20'}}>
                        <span className="card-icon">{service.icon}</span>
                      </div>
                      <h3 className="card-title">{service.title}</h3>
                      <p className="card-description">{service.description}</p>
                      
                      <button className="card-button">
                        <span>Learn More</span>
                        <svg className="arrow-icon" viewBox="0 0 24 24" width="24" height="24">
                          <path fill="none" d="M0 0h24v24H0z"/>
                          <path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"/>
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

        {/* Pagination Dots */}
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;