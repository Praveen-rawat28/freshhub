import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Search, Sparkles, Clock, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: '🧺' },
  { id: 'vegetables', label: 'Fresh Veggies', icon: '🥕' },
  { id: 'fruits', label: 'Sweet Fruits', icon: '🥭' },
  { id: 'leafy', label: 'Hydroponic Greens', icon: '🥬' },
  { id: 'cut', label: 'Ready-to-Cook Cut Veg', icon: '🔪' },
  { id: 'bakery', label: 'Artisan Bakery', icon: '🍞' }
];

export default function Storefront({ onNavigateToTrack }) {
  const { products } = useApp();
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: '30px' }}>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={12} />
            <span>Farm-Harvested at 4:30 AM Today</span>
          </div>
          <h2 className="hero-title">Delivered in Chilled Crates in 90 Minutes.</h2>
          <p className="hero-sub">
            Direct from Sonipat & Nashik mandis. Zero-touch processing, live warehouse batch tracking, and guaranteed freshness.
          </p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6ee7b7' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> Express 90 min slot
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} /> Chilled Cold Chain
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          position: 'relative',
          background: 'rgba(30,41,59,0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          padding: '4px 14px'
        }}>
          <Search size={18} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search farm fresh tomatoes, spinach, sourdough, mango..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '10px 12px',
              color: '#ffffff',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="category-scroll-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${selectedCat === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Product Catalog Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
