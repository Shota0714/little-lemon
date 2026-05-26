import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import BookingForm from './BookingForm';

// 1. Reducer initialization function using the injected Coursera API script
export const initializeTimes = () => {
  const today = new Date();
  // Call the script function globally from the window object safely
  return window.fetchAPI ? window.fetchAPI(today) : ['17:00', '18:00', '19:00', '20:00', '21:00'];
};

// 2. Reducer function that handles updating the times based on action date
export const updateTimes = (state, action) => {
  if (action.type === 'UPDATE_TIMES' && window.fetchAPI) {
    const selectedDate = new Date(action.payload);
    return window.fetchAPI(selectedDate);
  }
  return state;
};

const BookingPage = () => {
  // Use the reducer hook to manage times instead of useState
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  // 3. Callback triggered whenever the user changes the Date input field
  const handleDateChange = (dateString) => {
    dispatch({ type: 'UPDATE_TIMES', payload: dateString });
  };

  // 4. Form submission using the injected submitAPI
  const handleBookingSubmit = (formData) => {
    if (window.submitAPI) {
      const isSubmitted = window.submitAPI(formData);
      if (isSubmitted) {
        // Navigate to the newly created success page route path
        navigate('/confirmed'); 
      } else {
        alert('Something went wrong. Please try again.');
      }
    } else {
      // Local fallback for test environments if script is missing
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
          onDateChange={handleDateChange} // Passing down the dispatch notifier
        />
      </main>
    </div>
  );
};

export default BookingPage;