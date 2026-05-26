import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Little Lemon</div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/booking">Reservations</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;