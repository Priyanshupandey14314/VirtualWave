import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import bgImage from '../assets/back2.jpg';
import rightSideImage from '../assets/heroImg.png';
// --- Helper Component for Animation ---
const AnimatedCounter = ({ target, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      if (progress < duration) {
        const percentage = progress / duration;
        setCount(Math.floor(target * percentage));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <>{count}{suffix}</>;
};
const Hero = () => {
  return (
    <section className="hero-section"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* <div className="hero-overlay"></div>  */}
      <div className="hero-container">
        <div className="hero-main">

          <div className="hero-left">
            <h1 className="hero-title">
              We help Businesses & Startups
              <span className="gradient-text"> Grow 2X with Smart Digital Marketing strategy</span>
            </h1>
            <p className="hero-description">
              Virtual Wave delivers data-driven SEO, paid ads, social media marketing, and high-converting websites that drive traffic, leads, and revenue.
            </p>
            <div className="hero-buttons">
              <Link to="/services">
                <button className="btn btn-secondary">Explore Services</button>
              </Link>
              <a href="https://wa.me/919555031430" target="_blank" rel="noopener noreferrer">
                <button className="btn btn-secondary">Get in touch</button>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <img src={rightSideImage} alt="Digital Marketing Growth" className="hero-img-element" />
          </div>

        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">
              <AnimatedCounter target={500} suffix="+" />
            </span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">
              <AnimatedCounter target={98} suffix="%" />
            </span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">
              <AnimatedCounter target={24} suffix="/7" />
            </span>
            <span className="stat-label">Support</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;