import React, { useState } from 'react';
import { useApp, ROLE_PROFILES } from '../context/AppContext';
import { ShoppingBag, Sun, Moon, LogOut, ChevronDown, ShieldCheck, User } from 'lucide-react';

export default function Navbar({ setIsCartOpen }) {
  const {
    cart,
    theme,
    toggleTheme,
    currentRole,
    userProfile,
    setIsRoleSwitcherOpen,
    setIsAuthModalOpen,
    showToast
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const getSubTitle = () => {
    switch (currentRole) {
      case 'rider':
        return 'Delivery Partner Fleet';
      case 'staff':
        return 'Warehouse Fulfillment Console';
      case 'admin':
        return 'Master Control Tower';
      default:
        return 'Farm Fresh Express';
    }
  };

  return (
    <header className="app-header">
      {/* Brand Logo & Current Role Subtitle */}
      <div className="brand-logo" onClick={() => setIsRoleSwitcherOpen(true)}>
        <div className="brand-icon">🌱</div>
        <div className="brand-text">
          <h1>FreshHub</h1>
          <p>{getSubTitle()}</p>
        </div>
      </div>

      {/* Role Switcher Pill in Navbar */}
      <button
        className="nav-role-badge-btn"
        onClick={() => setIsRoleSwitcherOpen(true)}
        title="Click to Switch User Role / Panel"
      >
        <span className="role-dot"></span>
        <span>Panel: <strong>{userProfile.badge || 'Customer'}</strong></span>
        <span style={{ fontSize: '10px', opacity: 0.7 }}>⇄ Switch</span>
      </button>

      {/* Right Actions */}
      <div className="nav-actions">
        {/* Theme Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User Account / Profile Button */}
        <div style={{ position: 'relative' }}>
          <button
            className="user-profile-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title={userProfile.name}
          >
            <span className="user-avatar-badge">{userProfile.avatar || 'U'}</span>
            <span className="user-name-label">{userProfile.name.split(' ')[0]}</span>
            <ChevronDown size={14} />
          </button>

          {/* User Dropdown Menu */}
          {isMenuOpen && (
            <div className="user-dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <div className="user-dropdown-header">
                <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '13px' }}>
                  {userProfile.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '700' }}>
                  {userProfile.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {userProfile.phone}
                </div>
              </div>

              <div style={{ padding: '6px' }}>
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
                    setIsRoleSwitcherOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <ShieldCheck size={15} />
                  <span>Switch Role Panel</span>
                </button>

                {currentRole === 'customer' && (
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <User size={15} />
                    <span>My Delivery Address</span>
                  </button>
                )}

                <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />

                <button
                  className="dropdown-item logout"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsRoleSwitcherOpen(true);
                    showToast('Logged out of active role');
                  }}
                >
                  <LogOut size={15} />
                  <span>Logout / Switch Profile</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart button only visible for customer */}
        {currentRole === 'customer' && (
          <button className="cart-toggle-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={18} />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        )}
      </div>
    </header>
  );
}
