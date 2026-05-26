import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'; // Double-check your actual path to Nav
import HomePage from './components/HomePage'; // Double-check this path
import BookingPage from './components/BookingPage'; // Double-check this path

function App() {
    return (
        <>
            <Nav />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/booking" element={<BookingPage />} />
                </Routes>
            </main>
        </>
    );
}

// CRITICAL: Make sure this line exists!
export default App;