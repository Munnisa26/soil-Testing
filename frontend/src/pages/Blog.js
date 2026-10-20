import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((res) => setPosts(res.data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const fallback = [
    {
      id: '1',
      title: 'Why Soil Testing is Essential for Modern Farming',
      excerpt: 'Discover why regular soil testing is critical for sustainable and profitable farming.',
      category: 'Farming Tips',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80'
    },
    {
      id: '2',
      title: 'Understanding Soil pH and Its Impact on Crop Growth',
      excerpt: 'Learn how soil pH influences nutrient availability and what you can do about it.',
      category: 'Soil Science',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'
    },
    {
      id: '3',
      title: 'NPK Fertilizers: How to Use Soil Test Results',
      excerpt: 'A practical guide to interpreting NPK results and applying fertilizers correctly.',
      category: 'Fertilizers',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80'
    }
  ];

  const images = [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'
  ];

  const displayPosts = (posts.length > 0 ? posts : fallback).map((p, i) => ({
    ...p,
    image: p.image_url || p.image || images[i % images.length]
  }));

  return (
    <div>
      <section
        className="page-hero"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(27,67,50,0.88), rgba(45,106,79,0.82)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container text-center">
          <h1>Blog / Soil Knowledge</h1>
          <p>Articles and guides on soil health and testing</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>
          ) : (
            <div className="row g-4">
              {displayPosts.map((p) => (
                <div className="col-md-6 col-lg-4" key={p.id}>
                  <div className="test-card h-100">
                    <img src={p.image} alt={p.title} className="test-card-img" loading="lazy" />
                    <div className="test-card-body">
                      <span className="badge bg-success mb-2">{p.category || 'General'}</span>
                      <h5 className="mb-2">{p.title}</h5>
                      <p className="text-muted small">{p.excerpt}</p>
                      <Link to={`/blog/${p.id}`} className="fw-semibold">Read more →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;