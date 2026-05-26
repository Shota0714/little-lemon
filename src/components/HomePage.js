import React from 'react';
import Nav from './Nav';
import CallToAction from './CallToAction';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import Chicago from './Chicago';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Nav />
      <main>
        <CallToAction />
        <Specials />
        <CustomersSay />
        <Chicago />
      </main>
    </div>
  );
};

export default Homepage;