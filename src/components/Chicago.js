import React from 'react';

const Chicago = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>Little Lemon</h2>
        <h3>Chicago</h3>
        <p>
          Little Lemon was founded by two Italian brothers, Adrian and Mario, who moved to Chicago to start a new chapter. 
          Combining traditional family recipes with modern culinary techniques, they created a unique Mediterranean dining experience.
        </p>
      </div>
      <div className="about-images">
        <img className="img-back" src="/assets/mario-and-adrian-a.jpg" alt="Owners Mario and Adrian" />
        <img className="img-front" src="/assets/mario-and-adrian-b.jpg" alt="Chefs prepping food" />
      </div>
    </section>
  );
};

export default Chicago;