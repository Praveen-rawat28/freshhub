import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Boxes, PackageCheck, Thermometer, AlertCircle, CheckCircle2, Clock, Truck } from 'lucide-react';

export default function StaffPanel() {
  const { orders, products, packOrderAsStaff, userProfile } = useApp();
  const [staffTab, setStaffTab] = useState('packing'); // 'packing' | 'batches'

  const newOrders = orders.filter((o) => o.state === 'NEW');
  const packedOrders = orders.filter((o) => o.state === 'READY_FOR_PICKUP' || o.state === 'PICKING');
  const outOrders = orders.filter((o) => o.state === 'OUT_FOR_DELIVERY');

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Staff Header Banner */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.08)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
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
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: 'white'
          }}>
            🏭
          </div>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>
              Warehouse Fulfillment Station
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              Station: <strong>{userProfile.station || 'WH-2 Dark Store'}</strong> · Operator: <strong>{userProfile.name}</strong>
            </p>
          </div>
        </div>

        {/* Temperature Monitor */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Thermometer size={18} color="#10b981" />
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Cold Room #2</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#10b981' }}>3.8°C (Optimal)</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={() => setStaffTab('packing')}
          style={{
            padding: '8px 18px',
            borderRadius: '10px',
            border: staffTab === 'packing' ? '1px solid #f59e0b' : '1px solid var(--border)',
            background: staffTab === 'packing' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-card)',
            color: staffTab === 'packing' ? '#f59e0b' : 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          📦 Packing Queue ({newOrders.length} pending)
        </button>

        <button
          onClick={() => setStaffTab('batches')}
          style={{
            padding: '8px 18px',
            borderRadius: '10px',
            border: staffTab === 'batches' ? '1px solid #f59e0b' : '1px solid var(--border)',
            background: staffTab === 'batches' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-card)',
            color: staffTab === 'batches' ? '#f59e0b' : 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          🏷️ FEFO Batch Inventory
        </button>
      </div>

      {staffTab === 'packing' ? (
        <div>
          {/* Order Packing Queue */}
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '12px' }}>
            Orders Awaiting Packing ({newOrders.length})
          </h4>

          {newOrders.length === 0 ? (
            <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '14px', textAlign: 'center', color: 'var(--text-muted)', border: '1px solid var(--border)', marginBottom: '24px' }}>
              <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
              <h4>All customer orders packed!</h4>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                New orders placed from the Customer panel will appear here automatically.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {newOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{order.id}</span>
                      <span style={{ fontSize: '11px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                        {order.slot}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-main)', marginTop: '4px' }}>
                      Customer: <strong>{order.customer}</strong> · {order.addr}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Items to pick: {(order.lines || []).map((l) => `${l.name} (${l.qty || 1}x)`).join(', ')}
                    </div>
                  </div>

                  <button
                    onClick={() => packOrderAsStaff(order.id)}
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <PackageCheck size={16} />
                    <span>Pack into Crate</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Staged Crates */}
          <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '12px' }}>
            Staged in Dispatch Bay ({packedOrders.length + outOrders.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[...packedOrders, ...outOrders].map((order) => (
              <div
                key={order.id}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: order.state === 'OUT_FOR_DELIVERY' ? 0.7 : 1
                }}
              >
                <div>
                  <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{order.id}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '10px' }}>
                    {order.crates || 1} crate(s) · {order.customer}
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: order.state === 'OUT_FOR_DELIVERY' ? '#3b82f6' : '#10b981' }}>
                  {order.state === 'OUT_FOR_DELIVERY' ? `Out with ${order.riderName || 'Rider'}` : 'Ready for Rider Pickup'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* FEFO Batch Inventory */
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontWeight: '700' }}>
            Live Produce Batches (First-Expired, First-Out)
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-dark)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Item</th>
                <th style={{ padding: '12px 16px' }}>Batch Code</th>
                <th style={{ padding: '12px 16px' }}>Origin</th>
                <th style={{ padding: '12px 16px' }}>Available Stock</th>
                <th style={{ padding: '12px 16px' }}>Shelf Life</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-main)' }}>{p.name}</td>
                  <td style={{ padding: '12px 16px', color: '#f59e0b', fontWeight: '600' }}>{p.batch}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{p.origin}</td>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--primary)' }}>{p.stockKg || 120} kg</td>
                  <td style={{ padding: '12px 16px' }}>{p.shelfLife}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
