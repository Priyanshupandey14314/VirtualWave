import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
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
  return (
    <section className="faq-section py-5" id="faq">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col xs={12} className="text-center">
            <h2 className="display-4 fw-bold text-dark mb-3">
              Frequently Asked <span className="gradient-text-faq">Questions</span>
            </h2>
            <p className="lead text-dark mx-auto" style={{ maxWidth: '600px' }}>
              Find answers to common questions about our services and processes.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={8}>
            <Accordion className="faq-accordion">
              {faqs.map((faq) => (
                <Accordion.Item key={faq.id} eventKey={faq.id.toString()} className="faq-item">
                  <Accordion.Header className="faq-question">
                    {faq.question}
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FAQ;