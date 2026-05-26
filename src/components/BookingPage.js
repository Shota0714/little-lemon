import React from 'react';
import Nav from './Nav';

const BookingPage = () => {
  return (
    <div className="booking-page-container">
      <Nav />
      <main className="booking-content">
        <h1>Reserve a Table</h1>
        <p>Please fill out the form below to book your table at Little Lemon Chicago.</p>
        
        {/* Placeholder for the reservation form element */}
        <form className="booking-form">
          <label htmlFor="res-date">Choose date</label>
          <input type="date" id="res-date" required />

          <label htmlFor="res-time">Choose time</label>
          <select id="res-time" required>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
          </select>

          <label htmlFor="guests">Number of guests</label>
          <input type="number" placeholder="1" min="1" max="10" id="guests" required />

          <label htmlFor="occasion">Occasion</label>
          <select id="occasion">
            <option>None</option>
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>

          <button type="submit" className="submit-booking-btn">Make Your Reservation</button>
        </form>
      </main>
    </div>
  );
};

export default BookingPage;