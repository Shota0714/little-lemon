import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container" aria-label="Little Lemon Footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img 
            src="/assets/footer-logo.png" 
            alt="Little Lemon stylized emblem logo" 
            className="footer-img" 
          />
        </div>

        <nav className="footer-column" aria-label="Footer Navigation">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/booking">Reservations</Link></li>
          </ul>
        </nav>

        <section className="footer-column" aria-labelledby="footer-contact-title">
          <h3 id="footer-contact-title">Contact Us</h3>
          <address style={{ fontStyle: 'normal' }}>
            <p>123 Lemon Street, Chicago, IL</p>
            <p><a href="tel:+13125550123">(312) 555-0123</a></p>
            <p><a href="mailto:info@littlelemon.com">info@littlelemon.com</a></p>
          </address>
        </section>

        <section className="footer-column" aria-labelledby="footer-social-title">
          <h3 id="footer-social-title">Social Media</h3>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Visit Facebook page">Facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Visit Instagram feed">Instagram</a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer" aria-label="Visit Twitter feed">Twitter</a></li>
          </ul>
        </section>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;