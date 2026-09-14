import React from 'react';
import { useApp } from '../context/AppContext';
import { Boxes, Truck, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export default function WarehouseOps({ onOpenRiderPortal }) {
  const { orders, riders } = useApp();

  const pendingOrders = orders.filter((o) => o.state !== 'DELIVERED');
  const deliveredOrders = orders.filter((o) => o.state === 'DELIVERED');

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>
            Dark Store Operations Console
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8' }}>
            WH-2 Sector 57 Gurugram · Real-time order packing, cold crates & fleet dispatch
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
        <div style={{ background: 'rgba(30,41,59,0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Active Orders</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>{pendingOrders.length}</div>
          <div style={{ fontSize: '11px', color: '#f59e0b' }}>Packing & Dispatched</div>
        </div>

        <div style={{ background: 'rgba(30,41,59,0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Delivered Today</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>{deliveredOrders.length}</div>
          <div style={{ fontSize: '11px', color: '#6ee7b7' }}>100% On-time</div>
        </div>

        <div style={{ background: 'rgba(30,41,59,0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Registered Fleet</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>{riders.length} Riders</div>
          <div style={{ fontSize: '11px', color: '#93c5fd' }}>EV & Motorcycles</div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{
        background: 'rgba(30,41,59,0.6)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700' }}>Dark Store Order Pipeline</h3>
          <button
            onClick={onOpenRiderPortal}
            style={{
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.3)',
              color: '#10b981',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Truck size={14} /> Open Rider View
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Order ID</th>
                <th style={{ padding: '12px 16px' }}>Customer & Drop</th>
                <th style={{ padding: '12px 16px' }}>Items & Crates</th>
                <th style={{ padding: '12px 16px' }}>Assigned Rider</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#10b981' }}>{o.id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontWeight: '600', color: '#ffffff' }}>{o.customer}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{o.addr}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {(o.lines || []).length} items · <span style={{ color: '#f59e0b', fontWeight: '700' }}>{o.crates || 1} crate(s)</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: o.riderName ? '#34d399' : '#94a3b8' }}>
                    {o.riderName || 'Unassigned'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      background: o.state === 'DELIVERED' ? 'rgba(16,185,129,0.15)' : o.state === 'OUT_FOR_DELIVERY' ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
                      color: o.state === 'DELIVERED' ? '#10b981' : o.state === 'OUT_FOR_DELIVERY' ? '#f59e0b' : '#3b82f6'
                    }}>
                      {o.state}
                    </span>
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
