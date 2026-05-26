import React, { useState } from 'react';

const BookingForm = ({ availableTimes, onSubmit }) => {
  // 1. Local state managed for form fields
  const [date, setDate] = useState('');
  const [time, setTime] = useState(availableTimes[0] || '');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('None');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the collected values back up to the parent page container
    onSubmit({ date, time, guests, occasion });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
        required 
      />

      <label htmlFor="res-time">Choose time</label>
      <select 
        id="res-time" 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
        required
      >
        {availableTimes.map((timeOption) => (
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        id="guests" 
        placeholder="1" 
        min="1" 
        max="10" 
        value={guests} 
        onChange={(e) => setGuests(e.target.value)} 
        required 
      />

      <label htmlFor="occasion">Occasion</label>
      <select 
        id="occasion" 
        value={occasion} 
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="None">None</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button type="submit" className="submit-booking-btn">
        Make Your Reservation
      </button>
    </form>
  );
};

export default BookingForm;