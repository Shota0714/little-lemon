import React from 'react';

const specialsData = [
  { id: 1, name: 'Greek Salad', price: '$12.99', description: 'The famous greek salad of crispy lettuce, onions, olives and our feta cheese.', img: '/assets/greek-salad.jpg' },
  { id: 2, name: 'Bruchetta', price: '$5.99', description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic.', img: '/assets/bruschetta.jpg' },
  { id: 3, name: 'Lemon Dessert', price: '$5.00', description: 'This comes straight from grandma’s recipe book, every last ingredient is authentic.', img: '/assets/lemon-dessert.jpg' }
];

const Specials = () => {
  return (
    <section className="specials-section">
      <div className="specials-header">
        <h2>This Weeks Specials!</h2>
        <button className="menu-button">Online Menu</button>
      </div>
      <div className="specials-grid">
        {specialsData.map((item) => (
          <div key={item.id} className="special-card">
            <img src={item.img} alt={item.name} />
            <div className="card-title">
              <h3>{item.name}</h3>
              <span className="price">{item.price}</span>
            </div>
            <p>{item.description}</p>
            <button className="order-delivery-btn">Order a delivery ➔</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specials;