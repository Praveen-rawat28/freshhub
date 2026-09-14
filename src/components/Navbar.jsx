import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Truck, Store, Boxes, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, setIsCartOpen }) {
  const { cart, theme, toggleTheme, user, logoutUser, setIsAuthModalOpen, showToast } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
    showToast('Logged out successfully');
  };

  return (
    <header className="app-header">
      {/* Brand Logo */}
      <div className="brand-logo" onClick={() => setCurrentView('store')}>
        <div className="brand-icon">🌱</div>
        <div className="brand-text">
          <h1>FreshHub</h1>
          <p>Farm Fresh Express</p>
        </div>
      </div>

      {/* Role / Portal Switcher */}
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

      {/* Right Header Actions */}
      <div className="nav-actions">
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Account / Auth Dropdown */}
        <div style={{ position: 'relative' }}>
          {user ? (
            <button
              className="user-profile-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title={user.name}
            >
              <span className="user-avatar-badge">{user.avatar || 'PR'}</span>
              <span className="user-name-label">{user.name.split(' ')[0]}</span>
              <ChevronDown size={14} />
            </button>
          ) : (
            <button
              className="user-signin-btn"
              onClick={() => setIsAuthModalOpen(true)}
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* User Profile Dropdown Menu */}
          {isMenuOpen && user && (
            <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <div className="user-dropdown-header">
                <div style={{ fontWeight: '700', color: 'var(--text-main)', fontSize: '13px' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {user.phone}
                </div>
              </div>

              <div style={{ padding: '8px' }}>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    setCurrentView('rider');
                    setIsMenuOpen(false);
                  }}
                >
                  <Truck size={15} />
                  <span>Rider Console</span>
                </button>

                <button
                  className="dropdown-item"
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <User size={15} />
                  <span>Profile & Address</span>
                </button>

                <div style={{ height: '1px', background: 'var(--border)', margin: '6px 0' }} />

                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart Toggle */}
        <button className="cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={18} />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
