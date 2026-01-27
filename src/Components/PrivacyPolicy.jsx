import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-section" id="privacy">
      <div className="privacy-container">
        <div className="privacy-header">
          <h2 className="privacy-title">
            Privacy <span className="gradient-text-privacy">Policy</span>
          </h2>
          <p className="privacy-subtitle">
            Virtual Wave respects your privacy and is committed to keeping your personal data safe and secure. We collect only the information that is necessary to provide our digital marketing services.
          </p>
          <p className="privacy-last-updated">Last updated: January 27, 2026</p>
        </div>

        <div className="privacy-content">
          <div className="privacy-section-block">
            <h3 className="privacy-section-title">Information We Collect</h3>
            <p className="privacy-text">
              We may collect your name, email address, phone number, business details, and basic website usage data (such as cookies and IP address) when you contact us or submit an enquiry.
            </p>
          </div>

          <div className="privacy-section-block">
            <h3 className="privacy-section-title">How We Use Your Information</h3>
            <p className="privacy-text">We use your information to:</p>
            <ul className="privacy-list">
              <li className="privacy-list-item">Provide and manage our services</li>
              <li className="privacy-list-item">Respond to enquiries and support requests</li>
              <li className="privacy-list-item">Share service-related updates and communication</li>
              <li className="privacy-list-item">Improve website performance and user experience</li>
            </ul>
          </div>

          <div className="privacy-section-block">
            <h3 className="privacy-section-title">Data Security</h3>
            <p className="privacy-text">
              We take appropriate technical and organizational measures to protect your personal data. Your information is stored securely and protected against unauthorized access, misuse, or loss. We do not sell or misuse your data under any circumstances.
            </p>
          </div>

          <div className="privacy-section-block">
            <h3 className="privacy-section-title">Third-Party Tools</h3>
            <p className="privacy-text">
              We may use trusted third-party tools such as analytics, advertising platforms, and social media tools. These tools follow their own privacy and security standards.
            </p>
          </div>

          <div className="privacy-section-block">
            <h3 className="privacy-section-title">Consent</h3>
            <p className="privacy-text">
              By using our website, you agree to this Privacy Policy.
            </p>
          </div>
        </div>

        <div className="privacy-contact">
          <h3 className="contact-title">Contact Us</h3>
          <p className="contact-text">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> privacy@virtualwave.com</p>
            <p><strong>Phone:</strong> +1 (234) 567-890</p>
            <p><strong>Address:</strong> 123 Business Street, City, Country</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;