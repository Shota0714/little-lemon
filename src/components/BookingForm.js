import React, { useState, useEffect } from 'react';

const BookingForm = ({ availableTimes, onSubmit, onDateChange }) => {
  // Form Field State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('None');

  // React Client-Side Validation State
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Maintain valid default time when parent array shifts
  useEffect(() => {
    if (availableTimes.length > 0) {
      setTime(availableTimes[0]);
    }
  }, [availableTimes]);

  // Run validation checks every time an input value changes
  useEffect(() => {
    validateForm();
  }, [date, time, guests]);

  const validateForm = () => {
    let currentErrors = {};
    let valid = true;

    // 1. Date validation (Must not be in the past)
    if (!date) {
      currentErrors.date = 'Date is required';
      valid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        currentErrors.date = 'Reservations cannot be made for past dates';
        valid = false;
      }
    }

    // 2. Time validation
    if (!time) {
      currentErrors.time = 'Please select an available time slot';
      valid = false;
    }

    // 3. Guests validation (HTML5 handles 1-10, React checks boundaries)
    const guestNum = parseInt(guests, 10);
    if (isNaN(guestNum) || guestNum < 1) {
      currentErrors.guests = 'At least 1 guest is required';
      valid = false;
    } else if (guestNum > 10) {
      currentErrors.guests = 'For parties larger than 10, please contact us directly';
      valid = false;
    }

    setErrors(currentErrors);
    setIsFormValid(valid);
  };

  const handleDateChangeInternal = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    onDateChange(newDate); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit({ date, time, guests, occasion });
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      
      {/* Date Field */}
      <label htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        value={date} 
        onChange={handleDateChangeInternal} 
        required /* HTML5 Attribute */
        style={{ borderColor: errors.date ? '#EE9972' : '' }}
      />
      {errors.date && <span className="error-message" style={{ color: '#EE9972', fontSize: '14px' }}>{errors.date}</span>}

      {/* Time Field */}
      <label htmlFor="res-time">Choose time</label>
      <select 
        id="res-time" 
        value={time} 
        onChange={(e) => setTime(e.target.value)} 
        required /* HTML5 Attribute */
        style={{ borderColor: errors.time ? '#EE9972' : '' }}
      >
        {availableTimes.map((timeOption) => (
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>
      {errors.time && <span className="error-message" style={{ color: '#EE9972', fontSize: '14px' }}>{errors.time}</span>}

      {/* Guests Field */}
      <label htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        id="guests" 
        placeholder="1" 
        min="1"  /* HTML5 Attribute */
        max="10" /* HTML5 Attribute */
        value={guests} 
        onChange={(e) => setGuests(e.target.value)} 
        required /* HTML5 Attribute */
        style={{ borderColor: errors.guests ? '#EE9972' : '' }}
      />
      {errors.guests && <span className="error-message" style={{ color: '#EE9972', fontSize: '14px' }}>{errors.guests}</span>}

      {/* Occasion Field */}
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

      {/* Submit Button Controlled by State */}
      <button 
        type="submit" 
        className="submit-booking-btn" 
        disabled={!isFormValid}
        style={{ 
          backgroundColor: !isFormValid ? '#EDEFEE' : '#F4CE14',
          color: !isFormValid ? '#A1A1A1' : '#333333',
          cursor: !isFormValid ? 'not-allowed' : 'pointer'
        }}
      >
        Make Your Reservation
      </button>
    </form>
  );
};

export default BookingForm;