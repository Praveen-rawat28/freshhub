import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, TrendingUp, Users, Truck, Store, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AdminPanel() {
  const { orders, riders, cancelOrderAsAdmin, resetDemoData, userProfile } = useApp();

  const totalRevenue = orders.reduce((sum, o) => {
    const linesTotal = (o.lines || []).reduce((acc, l) => acc + (l.price || 0) * (l.qty || 1), 0);
    return sum + linesTotal + 29;
  }, 0);

  const deliveredCount = orders.filter((o) => o.state === 'DELIVERED').length;
  const transitCount = orders.filter((o) => o.state === 'OUT_FOR_DELIVERY').length;
  const pendingCount = orders.filter((o) => o.state === 'NEW' || o.state === 'PICKING' || o.state === 'READY_FOR_PICKUP').length;

  return (
    <div style={{ padding: '20px', maxWidth: '1050px', margin: '0 auto' }}>
      {/* Admin Header */}
      <div style={{
        background: 'rgba(168, 85, 247, 0.08)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        borderRadius: '16px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #a855f7, #7e22ce)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: 'white'
          }}>
            👑
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              Master Admin Control Centre
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Administrator: <strong>{userProfile.name}</strong> ({userProfile.title}) · Full System Access
            </p>
          </div>
        </div>

        <button
          onClick={resetDemoData}
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCcw size={14} />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Total Pipeline GMV
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)', marginTop: '4px' }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Live order book</div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Active Fleet
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>
            {riders.length} Riders
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gurugram Cluster</div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Deliveries Completed
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
            {deliveredCount}
          </div>
          <div style={{ fontSize: '11px', color: '#10b981' }}>{transitCount} currently in transit</div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Dark Store Hubs
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>
            2 Active
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>WH-1 DLF & WH-2 Sec 57</div>
        </div>
      </div>

      {/* Orders Management Table */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: '16px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontWeight: '800' }}>
          Global Order Control & Overrides
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-dark)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Order ID</th>
                <th style={{ padding: '12px 16px' }}>Customer & Phone</th>
                <th style={{ padding: '12px 16px' }}>Warehouse</th>
                <th style={{ padding: '12px 16px' }}>Assigned Rider</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Admin Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '800', color: 'var(--primary)' }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{o.customer}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{o.phone || '+91 98••• •••••'}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-main)' }}>{o.wh}</td>
                  <td style={{ padding: '12px 16px', color: o.riderName ? '#34d399' : 'var(--text-muted)' }}>
                    {o.riderName || 'Unassigned'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background: o.state === 'DELIVERED' ? 'rgba(16,185,129,0.15)' : o.state === 'OUT_FOR_DELIVERY' ? 'rgba(59,130,246,0.15)' : o.state === 'CANCELLED' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                      color: o.state === 'DELIVERED' ? '#10b981' : o.state === 'OUT_FOR_DELIVERY' ? '#3b82f6' : o.state === 'CANCELLED' ? '#ef4444' : '#f59e0b'
                    }}>
                      {o.state}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    {o.state !== 'CANCELLED' && o.state !== 'DELIVERED' && (
                      <button
                        onClick={() => cancelOrderAsAdmin(o.id)}
                        style={{
                          background: 'rgba(239,68,68,0.12)',
                          border: '1px solid rgba(239,68,68,0.3)',
                          color: '#ef4444',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
