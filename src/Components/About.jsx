import './About.css';

const About = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Mission Driven',
      description: 'We are committed to delivering exceptional digital marketing solutions that drive real business growth.'
    },
    {
      icon: '💼',
      title: 'Expert Team',
      description: 'Our team consists of industry experts with years of experience in digital marketing and technology.'
    },
    {
      icon: '🚀',
      title: 'Innovation First',
      description: 'We leverage the latest tools and technologies to stay ahead of the curve and deliver cutting-edge solutions.'
    },
    {
      icon: '🤝',
      title: 'Client Focused',
      description: 'Your success is our priority. We work closely with clients to understand their unique needs and goals.'
    }
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">
            More <span className="gradient-text-about">About Us</span>
          </h2>
          <p className="about-subtitle">
            We are a team of passionate digital marketing experts dedicated to helping businesses thrive online
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-description">
              <p className="description-text">
                At VirtualWave, we believe in the power of digital transformation. 
                With over a decade of experience in the industry, we've helped hundreds 
                of businesses establish their online presence and achieve remarkable growth.
              </p>
              <p className="description-text">
                Our approach combines data-driven strategies with creative excellence, 
                ensuring that every campaign we create not only looks great but delivers 
                measurable results. We're not just another agency – we're your partners 
                in success.
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="about-features">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ '--delay': `${index * 0.1}s` }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

