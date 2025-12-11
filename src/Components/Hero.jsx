import React, { useState, useEffect } from 'react';
import './Hero.css'; 
import bgImage from '../assets/back.png'; 
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
    <section className="hero-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="hero-overlay"></div> 
      <div className="hero-container">
        <div className="hero-main">
          
          <div className="hero-left">
            <h1 className="hero-title">
              Best Digital Marketing
              <span className="gradient-text"> Solution Agency</span>
            </h1>
            <p className="hero-description">
              Transform your business with cutting-edge digital marketing strategies. 
              We help brands reach their full potential through innovative campaigns 
              and data-driven solutions.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
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