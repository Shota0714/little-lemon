import React, { useState } from 'react';
import Nav from './Nav';
import BookingForm from './BookingForm';

const BookingPage = () => {
  // A simulated data source for open table slots 
  const [availableTimes, setAvailableTimes] = useState([
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ]);

  const handleBookingSubmit = (formData) => {
    // This receives the bundled state object from <BookingForm />
    console.log('Reservation confirmed:', formData);
    alert(`Success! Table reserved for ${formData.guests} guests on ${formData.date} at ${formData.time}.`);
    
    // Here you would normally execute an API call (e.g., fetch or axios POST request)
  };

  return (
    <div className="booking-page-container">
      {/* Global Nav across pages */}
      <Nav />
      
      <main className="booking-content">
        <h1>Reserve a Table</h1>
        <p>Please fill out the form below to book your table at Little Lemon Chicago.</p>
        
        {/* Render Form, pass required properties and submit handler down */}
        <BookingForm 
          availableTimes={availableTimes} 
          onSubmit={handleBookingSubmit} 
        />
      </main>
    </div>
  );
};

export default BookingPage;