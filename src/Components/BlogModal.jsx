import React from 'react';
import './ServiceModal.css'; // Reusing modal styles
import { getImageUrl } from '../config';

const BlogModal = ({ blog, onClose }) => {
    if (!blog) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    {blog.image && (
                        <div className="modal-image-container">
                            <img src={getImageUrl(blog.image)} alt={blog.title} className="modal-hero-image" />
                        </div>
                    )}
                    <div className="modal-title-section">
                        <span className="modal-category">{blog.category}</span>
                        <h2>{blog.title}</h2>
                        <div className="modal-meta">
                            <span>{blog.author}</span> • <span>{blog.readTime}</span> • <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="blog-content-html" dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </div>
        </div>
    );
};

export default BlogModal;
