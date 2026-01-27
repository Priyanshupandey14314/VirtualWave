import React, { useState } from 'react';
import axios from 'axios';
import './ServiceModal.css';
import { getImageUrl, API_BASE_URL } from '../config';

const ServiceModal = ({ service, onClose }) => {
    const [showContactForm, setShowContactForm] = useState(false);
    const [formData, setFormData] = useState({ email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });
    const [expandedSubService, setExpandedSubService] = useState(null);

    if (!service) return null;
    // Use service color or fallback
    const accentColor = service.color || '#4f46e5';

    const toggleSubService = (index) => {
        setExpandedSubService(expandedSubService === index ? null : index);
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: null });

        try {
            await axios.post(`${API_BASE_URL}/messages.php`, {
                service_id: service.id || service._id,
                service_title: service.title,
                service_category: service.category,
                user_email: formData.email,
                message: formData.message
            });
            setFormStatus({ loading: false, success: true, error: null });
            // Optional: Close form after delay
            setTimeout(() => {
                setShowContactForm(false);
                setFormStatus({ loading: false, success: false, error: null });
                setFormData({ email: '', message: '' });
            }, 2000);
        } catch (err) {
            setFormStatus({ loading: false, success: false, error: 'Failed to send message.' });
        }
    };

    return (
        <div className="service-modal-overlay">
            <div className="service-modal-content">
                <button className="modal-close-btn" onClick={onClose}>
                    &times;
                </button>

                {/* Simple Header Layout: Image Left, Info Right */}
                <div
                    className="modal-simple-header"
                    style={{
                        background: `linear-gradient(135deg, #ffffff 0%, ${accentColor}10 100%)`,
                        borderBottom: `1px solid ${accentColor}20`
                    }}
                >
                    <div className="modal-simple-image">
                        {service.image ? (
                            <img
                                src={getImageUrl(service.image)}
                                alt={service.title}
                                className="simple-main-image"
                                style={{ borderColor: `${accentColor}30` }}
                            />
                        ) : (
                            <div className="simple-no-image-placeholder" style={{ color: accentColor, background: `${accentColor}10` }}>
                                {service.icon}
                            </div>
                        )}
                    </div>
                    <div className="modal-simple-info">
                        <div className="modal-top-row">
                            <h2 className="modal-title">{service.title}</h2>
                            <span
                                className="modal-category"
                                style={{
                                    background: `${accentColor}`,
                                    color: '#fff',
                                    boxShadow: `0 4px 10px ${accentColor}40`,
                                    marginRight: '15px'
                                }}
                            >
                                {service.category}
                            </span>
                        </div>
                        <p className="modal-short-desc">
                            {service.description}
                        </p>
                    </div>
                </div>

                <div className="modal-details-section">
                    {!showContactForm ? (
                        <>
                            {/* Full Description */}
                            {service.detailedDescription && (
                                <div
                                    className="modal-description"
                                    dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
                                />
                            )}

                            {/* Sub-Services Accordion (Replacing Features) */}
                            {service.subservices && service.subservices.length > 0 && (
                                <div className="sub-services-section" style={{ marginTop: '20px', marginBottom: '30px' }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#1e293b', fontWeight: '700' }}>
                                        What's Included
                                    </h3>

                                    {/* Grid Container via CSS Class */}
                                    <div className="sub-services-list">
                                        {service.subservices.map((sub, index) => {
                                            const isExpanded = expandedSubService === index;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`sub-service-item ${isExpanded ? 'expanded' : ''}`}
                                                    style={{
                                                        // Keep dynamic colors inline
                                                        border: isExpanded ? `1px solid ${accentColor}` : '1px solid #e2e8f0',
                                                        borderRadius: '12px',
                                                        overflow: 'hidden',
                                                        backgroundColor: isExpanded ? `${accentColor}08` : 'white',
                                                        boxShadow: isExpanded ? `0 4px 12px ${accentColor}15` : '0 1px 2px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    <button
                                                        onClick={() => toggleSubService(index)}
                                                        style={{
                                                            width: '100%',
                                                            textAlign: 'left',
                                                            padding: '16px 20px',
                                                            background: 'none',
                                                            border: 'none',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            fontSize: '1rem',
                                                            fontWeight: '600',
                                                            color: isExpanded ? accentColor : '#334155',
                                                            margin: 0
                                                        }}
                                                    >
                                                        {sub.title}
                                                        <span style={{
                                                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                                            transition: 'transform 0.3s ease',
                                                            fontSize: '0.8rem',
                                                            color: isExpanded ? accentColor : '#94a3b8',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: '24px',
                                                            height: '24px',
                                                            borderRadius: '50%',
                                                            background: isExpanded ? `${accentColor}20` : '#f1f5f9'
                                                        }}>
                                                            ▼
                                                        </span>
                                                    </button>

                                                    <div style={{
                                                        maxHeight: isExpanded ? '500px' : '0',
                                                        overflow: 'hidden',
                                                        transition: 'max-height 0.4s ease-in-out',
                                                        opacity: isExpanded ? 1 : 0
                                                    }}>
                                                        <div style={{
                                                            padding: '0 20px 20px 20px',
                                                            color: '#e1e4e7ff !important',
                                                            fontSize: '0.95rem',
                                                            lineHeight: '1.6'
                                                        }}>
                                                            {sub.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
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
                                <button
                                    onClick={() => setShowContactForm(true)}
                                    className="action-btn btn-contact"
                                >
                                    📧 Contact Us
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="contact-form-container">
                            <h3 className="modal-title">Contact Us About {service.title}</h3>
                            <button className="back-link" onClick={() => setShowContactForm(false)}>
                                ← Back to Details
                            </button>

                            {formStatus.success ? (
                                <div className="success-message">
                                    <span style={{ fontSize: '2rem' }}>✅</span>
                                    <p>Message sent successfully! We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleContactSubmit} className="modal-contact-form">
                                    <div className="form-group">
                                        <label>Your Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            placeholder={`I'm interested in ${service.title}...`}
                                            rows={4}
                                        />
                                    </div>
                                    {formStatus.error && <p className="error-text">{formStatus.error}</p>}
                                    <button
                                        type="submit"
                                        className="action-btn btn-contact"
                                        disabled={formStatus.loading}
                                    >
                                        {formStatus.loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
