import React from 'react';
import { useApp, ROLE_PROFILES } from '../context/AppContext';
import { X, ShieldCheck, UserCheck, Check, Sparkles } from 'lucide-react';

export default function RoleSwitcher() {
  const { currentRole, switchRole, isRoleSwitcherOpen, setIsRoleSwitcherOpen } = useApp();

  return (
    <>
      {/* Floating Role Quick Switcher Pill */}
      <button
        className="role-floating-pill"
        onClick={() => setIsRoleSwitcherOpen(true)}
        title="Switch User Role & Access Panel"
      >
        <span className="role-pulse-dot"></span>
        <span>Role: <strong>{ROLE_PROFILES[currentRole]?.badge || 'Customer'}</strong></span>
        <span style={{ opacity: 0.7, fontSize: '11px' }}>▼</span>
      </button>

      {/* Role Selection Modal */}
      {isRoleSwitcherOpen && (
        <div className="cart-drawer-overlay" onClick={() => setIsRoleSwitcherOpen(false)} style={{ zIndex: 260 }}>
          <div
            className="auth-modal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '480px',
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
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
                    Switch Authorized Panel
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                    Select a role to preview its dedicated interface & permissions
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsRoleSwitcherOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Role Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* 1. Customer */}
              <button
                className={`role-option-card ${currentRole === 'customer' ? 'active' : ''}`}
                onClick={() => switchRole('customer')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="role-option-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    🛍️
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-main)' }}>
                      Customer Panel
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Praveen Rawat · Farm shopping, cart & live order tracking
                    </div>
                  </div>
                </div>
                {currentRole === 'customer' && <Check size={18} color="#10b981" />}
              </button>

              {/* 2. Rider */}
              <button
                className={`role-option-card ${currentRole === 'rider' ? 'active' : ''}`}
                onClick={() => switchRole('rider')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="role-option-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                    🛵
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-main)' }}>
                      Rider Partner Panel
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Sahil Kumar · Dark store crate pickup, GPS navigation & cashouts
                    </div>
                  </div>
                </div>
                {currentRole === 'rider' && <Check size={18} color="#3b82f6" />}
              </button>

              {/* 3. Warehouse Staff */}
              <button
                className={`role-option-card ${currentRole === 'staff' ? 'active' : ''}`}
                onClick={() => switchRole('staff')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="role-option-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                    🏭
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-main)' }}>
                      Warehouse Staff Panel
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Neha Verma · WH-2 Dark Store packing station & batch control
                    </div>
                  </div>
                </div>
                {currentRole === 'staff' && <Check size={18} color="#f59e0b" />}
              </button>

              {/* 4. Super Admin */}
              <button
                className={`role-option-card ${currentRole === 'admin' ? 'active' : ''}`}
                onClick={() => switchRole('admin')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="role-option-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                    👑
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-main)' }}>
                      Super Admin Panel
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Vansh Bhati · Executive overview, GMV revenue & fleet control
                    </div>
                  </div>
                </div>
                {currentRole === 'admin' && <Check size={18} color="#a855f7" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
