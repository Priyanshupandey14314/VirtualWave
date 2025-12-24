import React from 'react';
import './ServiceModal.css';

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    // Helper to resolve image path
    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `http://localhost/virtual_wave_api/${path.replace(/\\/g, '/')}`;
    };

    return (
        <div className="service-modal-overlay">
            <div className="service-modal-content">
                <button className="modal-close-btn" onClick={onClose}>
                    &times;
                </button>

                <div
                    className="modal-image-section"
                    style={{
                        backgroundColor: service.color || '#4f46e5',
                        backgroundImage: service.image ? `url(${getImageUrl(service.image)})` : 'none'
                    }}
                >
                    {!service.image && <div className="no-image-placeholder">{service.icon}</div>}
                </div>

                <div className="modal-details-section">
                    {/* <span className="modal-category" style={{ backgroundColor: service.color || '#4f46e5' }}>
                        {service.category}
                    </span> */}
                    <h2 className="modal-title">{service.title}</h2>
                    <div
                        className="modal-description"
                        dangerouslySetInnerHTML={{ __html: service.detailedDescription || service.description }}
                    />

                    {service.features && service.features.length > 0 && (
                        <>
                            <h4 className="modal-features-title">What's Included</h4>
                            <ul className="modal-features-list">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="modal-feature-item">{feature}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    <div className="modal-actions">
                        <a
                            href={`https://wa.me/919876543210?text=I'm interested in ${service.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="action-btn btn-whatsapp"
                        >
                            💬 Chat on WhatsApp
                        </a>
                        <a href="mailto:contact@virtualwave.com" className="action-btn btn-contact">
                            📧 Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
