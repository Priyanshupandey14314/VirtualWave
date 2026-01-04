import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO, TechFlow",
        image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=ebf8ff&color=4338ca",
        quote: "VirtualWave transformed our digital presence completely. The ROI we've seen in just 3 months is incredible.",
        links: [
            { text: "View Case Study", url: "#" },
            { text: "Visit Website", url: "#" }
        ]
    },
    {
        id: 2,
        name: "David Chen",
        role: "Marketing Director, Nexus",
        image: "https://ui-avatars.com/api/?name=David+Chen&background=f0fdf4&color=16a34a",
        quote: "Their strategic approach to SEO and content marketing pushed us to the #1 spot in our niche.",
        links: [
            { text: "Read Success Story", url: "#" },
            { text: "LinkedIn Profile", url: "#" }
        ]
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Founder, StyleLoft",
        image: "https://ui-avatars.com/api/?name=Emily+Davis&background=fdf2f8&color=db2777",
        quote: "The team is professional, responsive, and truly talented. The new website logic is flawless.",
        links: [
            { text: "View Portfolio", url: "#" },
            { text: "Instagram", url: "#" }
        ]
    },
    {
        id: 4,
        name: "Michael Brown",
        role: "CTO, Innovation Labs",
        image: "https://ui-avatars.com/api/?name=Michael+Brown&background=fff7ed&color=ea580c",
        quote: "We needed a partner who understood complex tech stacks. VirtualWave delivered beyond expectations.",
        links: [
            { text: "Tech Specs", url: "#" },
            { text: "GitHub", url: "#" }
        ]
    },
    {
        id: 5,
        name: "Jessica Wilson",
        role: "VP Sales, GrowthInc",
        image: "https://ui-avatars.com/api/?name=Jessica+Wilson&background=eff6ff&color=2563eb",
        quote: "Our leads significantly improved quality-wise. The automation setup saved us hours every week.",
        links: [
            { text: "Impact Report", url: "#" },
            { text: "Contact", url: "#" }
        ]
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsToShow, setItemsToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsToShow(1);
            } else if (window.innerWidth < 1024) {
                setItemsToShow(2);
            } else {
                setItemsToShow(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, testimonials.length - itemsToShow);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="testimonials-title">Client <span className="gradient-text-testimonials">Stories</span></h2>
                    <p className="testimonials-subtitle">Trusted by innovative companies worldwide</p>
                </div>

                <div className="testimonials-carousel">
                    <button className="nav-btn prev-btn" onClick={prevSlide}>&#8592;</button>

                    <div className="carousel-viewport">
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`
                            }}
                        >
                            {testimonials.map((client) => (
                                <div
                                    key={client.id}
                                    className="carousel-slide"
                                    style={{ flex: `0 0 ${100 / itemsToShow}%` }}
                                >
                                    <div className="testimonial-card">
                                        {/* Image Top & Centered */}
                                        <div className="client-image-wrapper">
                                            <img src={client.image} alt={client.name} className="client-image" />
                                        </div>

                                        <div className="client-info">
                                            <h4 className="client-name">{client.name}</h4>
                                            <p className="client-role">{client.role}</p>
                                        </div>

                                        <p className="client-quote">"{client.quote}"</p>

                                        <div className="client-links">
                                            {client.links.map((link, index) => (
                                                <a key={index} href={link.url} className="demo-link">
                                                    {link.text}
                                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                                        <polyline points="7 7 17 7 17 17"></polyline>
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="nav-btn next-btn" onClick={nextSlide}>&#8594;</button>
                </div>

                {/* Dots */}
                <div className="carousel-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            className={`dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
