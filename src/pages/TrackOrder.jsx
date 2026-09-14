import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Truck, MapPin, Package, ArrowRight } from 'lucide-react';

export default function TrackOrder({ onOpenRiderPortal }) {
  const { orders } = useApp();
  const latestOrder = orders[0];

  if (!latestOrder) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
        <h3>No active orders to track</h3>
        <p style={{ fontSize: '13px', marginTop: '6px' }}>
          Place an order in the Storefront to see live packing and rider updates.
        </p>
      </div>
    );
  }

  const isDelivered = latestOrder.state === 'DELIVERED';
  const isOutForDelivery = latestOrder.state === 'OUT_FOR_DELIVERY';
  const isPicking = latestOrder.state === 'PICKING' || latestOrder.state === 'NEW';

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{
        background: 'rgba(30,41,59,0.7)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '18px',
        padding: '24px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <span style={{
              background: isDelivered ? 'rgba(16,185,129,0.15)' : isOutForDelivery ? 'rgba(245,158,11,0.15)' : 'rgba(59,130,246,0.15)',
              color: isDelivered ? '#10b981' : isOutForDelivery ? '#f59e0b' : '#3b82f6',
              fontSize: '11px',
              fontWeight: '800',
              padding: '4px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase'
            }}>
              {isDelivered ? 'Delivered' : isOutForDelivery ? 'Out for Delivery' : 'Preparing at Dark Store'}
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginTop: '8px' }}>
              Order {latestOrder.id}
            </h2>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Placed at {latestOrder.placedAt} · {latestOrder.slot}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Fulfillment Hub</span>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#10b981' }}>
              {latestOrder.wh || 'WH-2 (Sector 57)'}
            </div>
          </div>
        </div>

        {/* Journey Timeline */}
        <div style={{
          background: '#0f172a',
          borderRadius: '14px',
          padding: '18px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '14px' }}>
            Live Delivery Timeline
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={18} color="#10b981" />
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Order Confirmed</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Allocated to cold store warehouse</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isOutForDelivery || isDelivered ? (
                <CheckCircle2 size={18} color="#10b981" />
              ) : (
                <Clock size={18} color="#f59e0b" />
              )}
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: isPicking ? '#f59e0b' : '#ffffff' }}>
                  Packed in Chilled Crates
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {latestOrder.crates || 1} crate(s) tagged for dispatch
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isDelivered ? (
                <CheckCircle2 size={18} color="#10b981" />
              ) : isOutForDelivery ? (
                <Truck size={18} color="#10b981" />
              ) : (
                <Clock size={18} color="#64748b" />
              )}
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: isOutForDelivery ? '#10b981' : isDelivered ? '#ffffff' : '#64748b' }}>
                  Out for Delivery
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Rider: <strong>{latestOrder.riderName || 'Assigning nearest delivery partner'}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isDelivered ? (
                <CheckCircle2 size={18} color="#10b981" />
              ) : (
                <MapPin size={18} color="#64748b" />
              )}
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: isDelivered ? '#10b981' : '#64748b' }}>
                  Delivered to Customer
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{latestOrder.addr}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rider Portal Prompt */}
        {!isDelivered && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.1))',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '12px',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>
                Simulate Delivery as Rider?
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                Open the Rider Partner Portal to accept, pick up, and complete this delivery.
              </div>
            </div>
            <button
              onClick={onOpenRiderPortal}
              style={{
                background: '#10b981',
                color: 'white',
                border: 'none',
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
              <span>Open Rider</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
