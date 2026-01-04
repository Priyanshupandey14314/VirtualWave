import React, { useState } from 'react';
import axios from 'axios';
import './ServiceModal.css';
import { getImageUrl, API_BASE_URL } from '../config';

const ServiceModal = ({ service, onClose }) => {
    const [showContactForm, setShowContactForm] = useState(false);
    const [formData, setFormData] = useState({ email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

    if (!service) return null;

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
                <div
                    className="modal-image-section"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1em 0' /* Vertical padding only to separate slightly */
                    }}
                >
                    {service.image ? (
                        <img
                            src={getImageUrl(service.image)}
                            alt={service.title}
                            className="modal-main-image"
                        />
                    ) : (
                        <div className="no-image-placeholder">{service.icon}</div>
                    )}
                </div>
                <div className="modal-details-section">
                    {!showContactForm ? (
                        <>
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
