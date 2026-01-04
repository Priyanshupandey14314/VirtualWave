import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './Team.css';

// Placeholder Data
const teamMembers = [
  {
    id: 1,
    name: 'Alex Morgan',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in digital innovation, driving strategic growth and team excellence.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Head of Digital Strategy',
    bio: 'Expert in crafting data-driven strategies that elevate brands and maximize online presence.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
    socials: { linkedin: '#', dribbble: '#' }
  },
  {
    id: 3,
    name: 'Marcus Chen',
    role: 'Lead SEO Specialist',
    bio: 'SEO maestro optimizing search rankings and driving organic traffic for global clients.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    id: 4,
    name: 'Priya Patel',
    role: 'Creative Director',
    bio: 'Creative visionary blending art and technology to deliver stunning visual experiences.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    socials: { dribbble: '#', instagram: '#' }
  },
  {
    id: 5,
    name: 'David Oyelowo',
    role: 'Paid Ads Manager',
    bio: 'Results-oriented ads specialist managing multi-million dollar campaigns across platforms.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
    socials: { linkedin: '#' }
  },
  {
    id: 6,
    name: 'Emily Blunt',
    role: 'Content Specialist',
    bio: 'Storyteller crafting compelling narratives that engage audiences and build brand loyalty.',
    image: 'https://images.unsplash.com/photo-1554774853-719586f8c277?q=80&w=2070&auto=format&fit=crop',
    socials: { linkedin: '#', instagram: '#' }
  }
];

// Icons
const socialIcons = {
  linkedin: <svg width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.358 1.248zM2.3 13.37h9v-9h-9v9zM20 12h-9v9h9v-9z" /></svg>,
  twitter: <svg width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" /></svg>,
  instagram: <svg width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.486-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" /></svg>,
  dribbble: <svg width="16" height="16" fill="currentColor" className="bi bi-dribbble" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.809-2.689zm-9.293.705a6.81 6.81 0 0 1 3.75-1.992c.422.541 1.121 1.709 1.928 2.927-1.315.632-2.969 1.485-5.678 1.623V4.393zm-.965 2.125a6.769 6.769 0 0 1-.864-1.912c2.85-.216 4.676-1.11 6.13-1.78.168.35.316.716.444 1.094.053.152.095.31.144.461-2.414.58-4.996 1.49-5.854 2.137zm-1.81 3.486a6.797 6.797 0 0 1 1.027-3.905c.82.68 3.71 1.845 6.31 1.346.069.215.127.438.182.667-.358.075-.723.116-1.107.116-2.586 0-4.872-1.39-6.412-3.461zm3.89 3.065a6.804 6.804 0 0 1-2.65-2.007c1.78-1.018 3.42-2.41 4.568-4.482.163.425.323.896.463 1.426-2.26 3.107-2.38 5.063-2.38 5.063zm3.75-1.173c.476-.05 2.94-.429 5.093 1.01a6.822 6.822 0 0 1-3.66 1.95 6.826 6.826 0 0 1-1.433-2.96zm1.907-5.187c2.404.305 4.634.738 5.08 1.13a6.805 6.805 0 0 1-2.023 3.593c-2.053-1.637-4.14-1.334-4.542-1.256.035-.164.066-.328.093-.497.35-.152.69-.333 1.015-.536.425-.265.83-.556 1.203-.865.08-.066.155-.133.228-.202.66-.62 1.313-1.25 1.946-1.367z" /></svg>
};

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive Logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 992) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = teamMembers.length - itemsToShow;
  const nextSlide = () => setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));

  // Touch Logic
  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <section className="team-section py-5" id="team">
      <div className="container">

        {/* Bootstrap Row for Header */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h2 className="display-4 fw-bold text-black mb-3">
              Meet Our <span className="gradient-text-team">Experts</span>
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              The creative minds and strategic thinkers behind your success.
            </p>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="position-relative">

          <div
            className="team-carousel-viewport overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="d-flex transition-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="px-3"
                  style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                >
                  {/* --- Team Card --- */}
                  <div className="team-card h-100 p-4">
                    <div className="member-img-container mx-auto mb-4">
                      <img src={member.image} alt={member.name} className="img-fluid rounded-circle member-img" />
                      <div className="social-overlay d-flex justify-content-center align-items-center gap-3">
                        {Object.entries(member.socials).map(([platform, link]) => (
                          <a key={platform} href={link} className="social-icon-btn d-flex align-items-center justify-content-center text-white text-decoration-none">
                            {socialIcons[platform]}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="fw-semibold text-black mb-1">{member.name}</h4>
                      <span className="text-uppercase small fw-bold text-primary mb-2 d-block">{member.role}</span>
                      <p className="text-muted small mb-0">{member.bio}</p>
                    </div>

                    <div className="card-hover-line"></div>
                  </div>
                  {/* ----------------- */}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button className="carousel-control-btn prev-btn d-none d-md-flex" onClick={prevSlide}>&#8592;</button>
          <button className="carousel-control-btn next-btn d-none d-md-flex" onClick={nextSlide}>&#8594;</button>

          {/* Dots */}
          <div className="d-flex justify-content-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`dot-indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;