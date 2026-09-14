import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Truck, Store, Boxes } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, setIsCartOpen }) {
  const { cart, activeRider } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="app-header">
      <div className="brand-logo" onClick={() => setCurrentView('store')}>
        <div className="brand-icon">🌱</div>
        <div className="brand-text">
          <h1>FreshHub</h1>
          <p>Farm Fresh Express</p>
        </div>
      </div>

      <div className="portal-switch-pill">
        <button
          className={`portal-switch-btn ${currentView === 'store' ? 'active' : ''}`}
          onClick={() => setCurrentView('store')}
        >
          <Store size={14} /> Storefront
        </button>
        <button
          className={`portal-switch-btn ${currentView === 'ops' ? 'active' : ''}`}
          onClick={() => setCurrentView('ops')}
        >
          <Boxes size={14} /> Dark Store Ops
        </button>
        <button
          className={`portal-switch-btn ${currentView === 'rider' ? 'active' : ''}`}
          onClick={() => setCurrentView('rider')}
        >
          <Truck size={14} /> Rider Partner
        </button>
      </div>

      <div className="nav-actions">
        <button className="cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={18} />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
