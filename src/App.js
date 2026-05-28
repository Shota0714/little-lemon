import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import Header from './components/Header';
import ConfirmedBooking from './components/ConfirmedBooking';
import About from './components/About';
import Menu from './components/Menu';
import Footer from './components/Footer';

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
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;