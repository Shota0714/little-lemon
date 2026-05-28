import React, { useState, useEffect } from 'react';

const BookingForm = ({ availableTimes, onSubmit, onDateChange }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('None');

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (availableTimes.length > 0) {
      setTime(availableTimes[0]);
    }
  }, [availableTimes]);

  useEffect(() => {
    validateForm();
  }, [date, time, guests]);

  const validateForm = () => {
    let currentErrors = {};
    let valid = true;

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

    if (!time) {
      currentErrors.time = 'Please select an available time slot';
      valid = false;
    }

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
    <section aria-labelledby="form-title">
      <h2 id="form-title" className="sr-only" style={{ display: 'none' }}>Table Reservation Form</h2>
      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="res-date">Choose date</label>
        <input 
          type="date" 
          id="res-date" 
          value={date} 
          onChange={handleDateChangeInternal} 
          required 
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? "date-error" : undefined}
          style={{ borderColor: errors.date ? '#EE9972' : '' }}
        />
        {errors.date && (
          <span id="date-error" role="alert" style={{ color: '#EE9972', fontSize: '14px' }}>
            {errors.date}
          </span>
        )}
        <label htmlFor="res-time">Choose time</label>
        <select 
          id="res-time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
          required
          aria-invalid={!!errors.time}
          aria-describedby={errors.time ? "time-error" : undefined}
          style={{ borderColor: errors.time ? '#EE9972' : '' }}
        >
          {availableTimes.map((timeOption) => (
            <option key={timeOption} value={timeOption}>
              {timeOption}
            </option>
          ))}
        </select>
        {errors.time && (
          <span id="time-error" role="alert" style={{ color: '#EE9972', fontSize: '14px' }}>
            {errors.time}
          </span>
        )}

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
          aria-invalid={!!errors.guests}
          aria-describedby={errors.guests ? "guests-error" : undefined}
          style={{ borderColor: errors.guests ? '#EE9972' : '' }}
        />
        {errors.guests && (
          <span id="guests-error" role="alert" style={{ color: '#EE9972', fontSize: '14px' }}>
            {errors.guests}
          </span>
        )}

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

        <button 
          type="submit" 
          className="submit-booking-btn" 
          disabled={!isFormValid}
          aria-label="On Click"
          style={{ 
            backgroundColor: !isFormValid ? '#EDEFEE' : '#F4CE14',
            color: !isFormValid ? '#A1A1A1' : '#333333',
            cursor: !isFormValid ? 'not-allowed' : 'pointer'
          }}
        >
          Make Your Reservation
        </button>
      </form>
    </section>
  );
};

export default BookingForm;