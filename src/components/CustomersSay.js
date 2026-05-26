import React from 'react';

const testimonialsData = [
  { id: 1, rating: 5, name: 'Sara L.', review: 'Serious comfort food. Highly recommend!', img: '/assets/user1.jpg' },
  { id: 2, rating: 4, name: 'John D.', review: 'The outdoor seating and ambiance were incredible.', img: '/assets/user2.jpg' },
  { id: 3, rating: 5, name: 'Mo A.', review: 'Authentic flavors. The lemon dessert is a must-try.', img: '/assets/user3.jpg' }
];

const CustomersSay = () => {
  return (
    <section className="testimonials-section">
      <h2>What our customers say!</h2>
      <div className="testimonials-grid">
        {testimonialsData.map((user) => (
          <div key={user.id} className="testimonial-card">
            <div className="stars">{'★'.repeat(user.rating)}</div>
            <div className="user-info">
              <img src={user.img} alt={user.name} />
              <h4>{user.name}</h4>
            </div>
            <p>"{user.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomersSay;