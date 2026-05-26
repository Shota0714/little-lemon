import React from 'react';

const CallToAction = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
        <button className="cta-button" onClick={() => window.location.href='/reservations'}>
          Reserve a Table
        </button>
      </div>
      <div className="hero-image">
        <img src="/assets/hero-chef-image.jpg" alt="Delicious Mediterranean food" />
      </div>
    </section>
  );
};

export default CallToAction;