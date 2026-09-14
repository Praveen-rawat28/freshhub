import React from 'react';
import { Home, Store, Clock, Boxes, Truck } from 'lucide-react';

export default function BottomNav({ currentView, setCurrentView }) {
  return (
    <nav className="mobile-bottom-nav">
      <button
        className={`mobile-nav-item ${currentView === 'store' ? 'active' : ''}`}
        onClick={() => setCurrentView('store')}
      >
        <span className="icon"><Home size={20} /></span>
        <span>Shop</span>
      </button>

      <button
        className={`mobile-nav-item ${currentView === 'track' ? 'active' : ''}`}
        onClick={() => setCurrentView('track')}
      >
        <span className="icon"><Clock size={20} /></span>
        <span>Track</span>
      </button>

      <button
        className={`mobile-nav-item ${currentView === 'ops' ? 'active' : ''}`}
        onClick={() => setCurrentView('ops')}
      >
        <span className="icon"><Boxes size={20} /></span>
        <span>Ops</span>
      </button>

      <button
        className={`mobile-nav-item ${currentView === 'rider' ? 'active' : ''}`}
        onClick={() => setCurrentView('rider')}
      >
        <span className="icon"><Truck size={20} /></span>
        <span>Rider</span>
      </button>
    </nav>
  );
}
