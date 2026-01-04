import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, children, className = '' }) => {
    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar Container */}
            <aside className={`common-sidebar ${isOpen ? 'active' : ''} ${className}`}>
                <button className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">
                    <i className="bi bi-x-lg"></i>
                </button>

                {/* Content */}
                <div className="sidebar-content-wrapper">
                    {children}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
