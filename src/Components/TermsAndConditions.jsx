import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <section className="terms-section" id="terms">
      <div className="terms-container">
        <div className="terms-header">
          <h2 className="terms-title">
            Terms & <span className="gradient-text-terms">Conditions</span>
          </h2>
          <p className="terms-subtitle">
            By accessing this website or using our services, you agree to the following terms and conditions.
          </p>
          <p className="terms-last-updated">Last updated: January 27, 2026</p>
        </div>

        <div className="terms-content">
          <div className="terms-section-block">
            <h3 className="terms-section-title">Services</h3>
            <p className="terms-text">
              Virtual Wave provides digital marketing services including social media marketing, lead generation, website development, SEO, paid advertising, graphic design, and content creation. Service details are finalized after discussion with the client.
            </p>
          </div>

          <div className="terms-section-block">
            <h3 className="terms-section-title">Payments</h3>
            <p className="terms-text">
              Payments must be made as per the agreed terms. Once the service has started, fees are non-refundable. Delayed payments may result in service suspension.
            </p>
          </div>

          <div className="terms-section-block">
            <h3 className="terms-section-title">Results Disclaimer</h3>
            <p className="terms-text">
              Digital marketing results are not guaranteed, as they depend on market conditions, platforms, and audience behavior. We apply proven strategies and best practices.
            </p>
          </div>

          <div className="terms-section-block">
            <h3 className="terms-section-title">Client Responsibilities</h3>
            <p className="terms-text">
              Clients must provide accurate information, content, and timely approvals. Delays from the client may affect project timelines.
            </p>
          </div>

          <div className="terms-section-block">
            <h3 className="terms-section-title">Intellectual Property</h3>
            <p className="terms-text">
              All strategies, designs, and content created by Virtual Wave remain our property unless stated otherwise.
            </p>
          </div>

          <div className="terms-section-block">
            <h3 className="terms-section-title">Changes & Termination</h3>
            <p className="terms-text">
              We reserve the right to update these terms or discontinue services if terms are violated.
            </p>
          </div>

          <div className="terms-section-block">
            <h3 className="terms-section-title">Governing Law</h3>
            <p className="terms-text">
              These terms are governed by the laws of India.
            </p>
          </div>
        </div>

        <div className="terms-contact">
          <h3 className="contact-title">Contact Us</h3>
          <p className="contact-text">
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> legal@virtualwave.com</p>
            <p><strong>Phone:</strong> +1 (234) 567-890</p>
            <p><strong>Address:</strong> 123 Business Street, City, Country</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;