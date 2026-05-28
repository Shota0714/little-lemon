import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';

export const initializeTimes = () => {
  const today = new Date();
  return window.fetchAPI ? window.fetchAPI(today) : ['17:00', '18:00', '19:00', '20:00', '21:00'];
};

export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES' && window.fetchAPI) {
    const selectedDate = new Date(action.payload);
    return window.fetchAPI(selectedDate);
  }
  return state;
};

const BookingPage = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  const handleDateChange = (dateString) => {
    dispatch({ type: 'UPDATE_TIMES', payload: dateString });
  };

  const handleBookingSubmit = (formData) => {
    if (window.submitAPI) {
      const isSubmitted = window.submitAPI(formData);
      if (isSubmitted) {
        navigate('/confirmed'); 
      } else {
        alert('Something went wrong. Please try again.');
      }
    } else {
      console.log('Mock submit fallback:', formData);
      navigate('/confirmed');
    }
  };

  return (
    <div className="booking-page-container">
      <main className="booking-content">
        <h1>Reserve a Table</h1>
        <p>Please select a date to see available time slots.</p>
        
        <BookingForm 
          availableTimes={availableTimes} 
          onSubmit={handleBookingSubmit} 
          onDateChange={handleDateChange}
        />
      </main>
    </div>
  );
};

export default BookingPage;