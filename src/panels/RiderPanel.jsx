import React from 'react';
import RiderPortal from '../pages/RiderPortal';

export default function RiderPanel() {
  return (
    <div style={{ minHeight: 'calc(100vh - 140px)' }}>
      {/* Banner / Header for Rider Role */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        borderBottom: '1px solid var(--border)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🛵</span>
          <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>Delivery Partner Portal</span>
          <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', padding: '2px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '10px' }}>
            AUTHORIZED RIDER
          </span>
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
          GPS Live Tracking Enabled
        </div>
      </div>

      <RiderPortal />
    </div>
  );
}
