import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const ConfirmedBooking = () => {
  return (
    <div className="confirmation-page-container">
      <Nav />
      <main className="booking-content" style={{ textAlign: 'center', marginTop: '60px' }}>
        <div className="confirmation-card" style={{ padding: '40px', backgroundColor: '#EDEFEE', borderRadius: '16px' }}>
          <h1 style={{ color: '#495E57', fontSize: '40px' }}>Booking Confirmed!</h1>
          <p style={{ fontSize: '18px', margin: '20px 0' }}>
            Thank you for choosing Little Lemon! Your reservation has been successfully made. 
            A confirmation email with your reservation details has been sent.
          </p>
          <div style={{ fontSize: '50px', color: '#F4CE14', marginBottom: '20px' }}>✓</div>
          <Link to="/">
            <button className="submit-booking-btn" style={{ width: 'auto', padding: '12px 30px' }}>
              Return to Homepage
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ConfirmedBooking;