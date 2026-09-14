import React, { useState } from 'react';
import Storefront from '../pages/Storefront';
import TrackOrder from '../pages/TrackOrder';
import { ShoppingBag, Clock, Store } from 'lucide-react';

export default function CustomerPanel({ onOpenCart }) {
  const [customerSubView, setCustomerSubView] = useState('shop'); // 'shop' | 'track'

  return (
    <div>
      {/* Customer Sub Nav Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        margin: '12px 20px 4px',
      }}>
        <button
          onClick={() => setCustomerSubView('shop')}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            border: customerSubView === 'shop' ? '1px solid var(--primary)' : '1px solid var(--border)',
            background: customerSubView === 'shop' ? 'var(--primary)' : 'var(--bg-card)',
            color: customerSubView === 'shop' ? '#ffffff' : 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          <Store size={15} />
          <span>Shop Fresh Produce</span>
        </button>

        <button
          onClick={() => setCustomerSubView('track')}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            border: customerSubView === 'track' ? '1px solid var(--primary)' : '1px solid var(--border)',
            background: customerSubView === 'track' ? 'var(--primary)' : 'var(--bg-card)',
            color: customerSubView === 'track' ? '#ffffff' : 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          <Clock size={15} />
          <span>Track My Orders</span>
        </button>
      </div>

      {customerSubView === 'shop' ? (
        <Storefront onNavigateToTrack={() => setCustomerSubView('track')} />
      ) : (
        <TrackOrder onOpenRiderPortal={() => {}} />
      )}
    </div>
  );
}
