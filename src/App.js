import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import Header from './components/Header';
import ConfirmedBooking from './components/ConfirmedBooking';

function App() {
    return (
        <>
            <Header />
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/confirmed" element={<ConfirmedBooking />} />
                </Routes>
            </main>
        </>
    );
}

export default App;