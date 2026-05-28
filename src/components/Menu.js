import React, { useState } from 'react';

const menuData = [
  {
    id: 1,
    name: 'Greek Salad',
    category: 'Appetizers',
    price: '$12.99',
    description: 'Crispy lettuce, peppers, onions, and olives topped with our authentic, house-imported Greek feta cheese.',
    image: '/assets/greek-salad.jpg',
    dietary: 'Vegetarian'
  },
  {
    id: 2,
    name: 'Bruschetta',
    category: 'Appetizers',
    price: '$7.99',
    description: 'Grilled artisan sourdough bread rubbed with garlic, drizzled with olive oil, and piled with seasoned tomatoes.',
    image: '/assets/bruschetta.jpg',
    dietary: 'Vegan'
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    category: 'Mains',
    price: '$24.95',
    description: 'Fresh Atlantic salmon fillet seared with Mediterranean herbs, served with a side of lemon-herb couscous.',
    image: '/assets/grilled-salmon.jpg',
    dietary: 'Gluten-Free'
  },
  {
    id: 4,
    name: 'Lemon Chicken Cavatappi',
    category: 'Mains',
    price: '$18.50',
    description: 'Tender grilled chicken tossed with cavatappi pasta, fresh baby spinach, and a bright, creamy lemon white-wine sauce.',
    image: '/assets/lemon-pasta.jpg',
    dietary: 'None'
  },
  {
    id: 5,
    name: 'Lemon Dessert',
    category: 'Desserts',
    price: '$6.00',
    description: 'Straight from grandma’s recipe book: a light, zesty lemon cake layered with curd and fresh whipped cream.',
    image: '/assets/lemon-dessert.jpg',
    dietary: 'Vegetarian'
  },
  {
    id: 6,
    name: 'Baklava',
    category: 'Desserts',
    price: '$8.00',
    description: 'Traditional flaky filo pastry layered with finely chopped walnuts and sweetened with our local citrus honey syrup.',
    image: '/assets/baklava.jpg',
    dietary: 'Vegetarian'
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <section className="menu-container" aria-labelledby="menu-main-title">
      <div className="menu-header">
        <h1 id="menu-main-title">Our Culinary Menu</h1>
        <p>Fresh, authentic Mediterranean recipes curated with a modern twist.</p>
      </div>

      <nav className="menu-tabs" aria-label="Menu Category Filter">
        {['All', 'Appetizers', 'Mains', 'Desserts'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`tab-btn ${activeCategory === category ? 'active-tab' : ''}`}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Dynamic Interactive Layout Grid */}
      <div className="menu-grid" role="region" aria-live="polite">
        {filteredMenu.map((item) => (
          <article key={item.id} className="menu-card">
            <div className="menu-card-img-box">
              <img src={item.image} alt={item.name} />
              {item.dietary !== 'None' && (
                <span className="dietary-badge">{item.dietary}</span>
              )}
            </div>
            
            <div className="menu-card-body">
              <div className="menu-card-title-line">
                <h2>{item.name}</h2>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p>{item.description}</p>
              <button 
                className="menu-order-btn" 
                aria-label={`Add ${item.name} to online order delivery`}
              >
                Order For Delivery ➔
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Menu;