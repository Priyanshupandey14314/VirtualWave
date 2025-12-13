import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  {
    id: 1,
    question: 'What services do you offer?',
    answer: 'We offer a comprehensive range of digital services including web development, mobile app development, digital marketing, SEO optimization, UI/UX design, and cloud solutions.'
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while a complex web application could take 3-6 months. We provide detailed timelines during our initial consultation.'
  },
  {
    id: 3,
    question: 'Do you provide ongoing maintenance and support?',
    answer: 'Yes, we offer comprehensive maintenance and support packages to ensure your digital assets remain secure, up-to-date, and performing optimally after launch.'
  },
  {
    id: 4,
    question: 'What is your pricing structure?',
    answer: 'Our pricing is project-based and depends on the scope, complexity, and timeline. We provide detailed quotes after understanding your requirements. We also offer flexible payment terms.'
  },
  {
    id: 5,
    question: 'Can you work with existing systems and technologies?',
    answer: 'Absolutely. We have experience integrating with various platforms, databases, and third-party services. We can work with your existing tech stack or recommend improvements.'
  },
  {
    id: 6,
    question: 'How do you ensure project quality and security?',
    answer: 'We follow industry best practices, conduct thorough testing, implement security measures, and use version control systems. All our work includes quality assurance and security audits.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-5" id="faq">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h2 className="display-4 fw-bold text-white mb-3">
              Frequently Asked <span className="gradient-text-faq">Questions</span>
            </h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
              Find answers to common questions about our services and processes.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="accordion-item faq-item">
                  <h2 className="accordion-header" id={`heading${faq.id}`}>
                    <button
                      className={`accordion-button ${activeIndex === index ? '' : 'collapsed'} faq-button`}
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={activeIndex === index}
                      aria-controls={`collapse${faq.id}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${faq.id}`}
                    className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                    aria-labelledby={`heading${faq.id}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body faq-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;