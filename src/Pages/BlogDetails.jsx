import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import './Blogs.css'; // We'll reuse/extend this CSS
import Loader from '../Components/Loader';
import { API_BASE_URL, getImageUrl } from '../config';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/blogs.php?id=${id}`);
                setBlog(res.data);
            } catch (err) {
                // Fallback if specific route doesn't exist yet (though I'll add it)
                // or handle error
                console.error(err);
                setError("Blog post not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) return (
        <>

            <CustomNavbar />
            <Loader />
            <Footer />
        </>
    );

    if (error || !blog) return (
        <>

            <CustomNavbar />
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}>
                <h2>{error || "Blog post not found"}</h2>
                <button onClick={() => navigate('/blogs')} className="secondary-btn" style={{ marginTop: '20px' }}>Back to Blogs</button>
            </div>
            <Footer />
        </>
    );

    return (
        <>

            <CustomNavbar />

            <article className="blog-details-page">
                <div className="blog-hero">
                    <div className="blogs-container"> {/* Reusing container from main blogs */}
                        <button onClick={() => navigate('/blogs')} className="back-link">
                            Back to Blogs
                        </button>
                        <div className="blog-header-content">
                            {blog.category && <span className="blog-badge">{blog.category}</span>}
                            <h1 className="blog-title-large">{blog.title}</h1>
                            <div className="blog-meta-large">
                                <span className="author">By {blog.author}</span>
                                <span className="separator">•</span>
                                <span className="date">{new Date(blog.created_at || Date.now()).toLocaleDateString()}</span>
                                <span className="separator">•</span>
                                <span className="read-time">{blog.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blogs-container">
                    <div className="blog-featured-image">
                        {blog.image ? (
                            <img
                                src={getImageUrl(blog.image)}
                                alt={blog.title}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        ) : null}
                    </div>

                    <div className="blog-body">
                        <div className="blog-content-html" dangerouslySetInnerHTML={{ __html: blog.content }} />

                        {blog.tags && blog.tags.length > 0 && (
                            <div className="blog-tags-footer">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="tag-pill">#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>
            <Footer />
        </>
    );
};

export default BlogDetails;
