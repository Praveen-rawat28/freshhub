import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, Phone, MapPin, CheckCircle, LogOut, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { user, loginUser, logoutUser, showToast } = useApp();
  const [phone, setPhone] = useState('+91 98990 12345');
  const [name, setName] = useState('Praveen Rawat');
  const [address, setAddress] = useState('Tower B, Flat 1204, Central Park · Sector 43, Gurugram');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const initials = name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'PR';

    const userData = {
      id: `user-${Date.now()}`,
      name,
      phone,
      address,
      avatar: initials
    };

    loginUser(userData);
    showToast(`Signed in as ${name}`);
    onClose();
  };

  const handleLogout = () => {
    logoutUser();
    showToast('Logged out successfully');
    onClose();
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose} style={{ zIndex: 250 }}>
      <div
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          margin: 'auto 16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '800'
            }}>
              {user ? (user.avatar || 'PR') : <User size={20} />}
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                {user ? user.name : 'Customer Sign In'}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
                {user ? 'Verified FreshHub Member' : 'Access your fresh delivery orders & address'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {user ? (
          <div>
            <div style={{
              background: 'rgba(16,185,129,0.06)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--primary)', fontWeight: '700', marginBottom: '8px' }}>
                <CheckCircle size={16} />
                <span>Logged In Account</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '4px' }}>
                <strong>Mobile:</strong> {user.phone}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                <strong>Address:</strong> {user.address}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#ef4444',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <LogOut size={16} />
                <span>Logout from Account</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Praveen Rawat"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98990 12345"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Delivery Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat / Building, Sector / Area"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-dark)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '8px',
                padding: '12px',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)'
              }}
            >
              Sign In & Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
