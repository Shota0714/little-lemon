import React from 'react';

const About = () => {
  return (
    <section className="about-container" aria-labelledby="about-title" id="about-section">
      <div className="about-content">
        {/* Text Story Column */}
        <div className="about-text-block">
          <h2 id="about-title">Little Lemon</h2>
          <h3>Chicago</h3>
          <p className="about-description">
            Founded by brothers Adrian and Mario, Little Lemon brings the vibrant flavors of the Mediterranean straight to the heart of Chicago. Combining traditional family recipes passed down through generations with a contemporary culinary twist, our kitchen crafts dishes that are both deeply nostalgic and excitingly modern.
          </p>
          <p className="about-description">
            Whether it’s our farm-fresh ingredients, our house-pressed olive oils, or the warm hospitality that treats every guest like family, we are dedicated to creating an unforgettable dining experience. Come share a table with us and celebrate the simple joy of great food.
          </p>
        </div>

        {/* Visual Multi-Image Stack Column */}
        <div className="about-image-wrapper">
          <img 
            src="/assets/chefs-mario-and-adrian-a.jpg" 
            alt="Chefs Mario and Adrian prepping fresh ingredients in the kitchen" 
            className="about-img img-top"
          />
          <img 
            src="/assets/chefs-mario-and-adrian-b.jpg" 
            alt="Adrian and Mario laughing outside the Chicago restaurant entrance" 
            className="about-img img-bottom"
          />
        </div>
      </div>
    </section>
  );
};

export default About;