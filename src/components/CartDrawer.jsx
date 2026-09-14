import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, onOrderPlaced }) {
  const { cart, updateCartQty, placeOrder } = useApp();
  const [selectedSlot, setSelectedSlot] = useState('Express 90 min');

  if (!isOpen) return null;

  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const packagingFee = cart.length > 0 ? 9 : 0;
  const deliveryFee = itemTotal > 199 ? 0 : 29;
  const grandTotal = itemTotal + packagingFee + deliveryFee;

  const handleCheckout = () => {
    const newOrder = placeOrder(selectedSlot);
    if (newOrder) {
      onClose();
      if (onOrderPlaced) onOrderPlaced(newOrder.id);
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3>Your Fresh Basket</h3>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>
              ({cart.length} items)
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="cart-items-scroll">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛒</div>
              <h4>Your basket is empty</h4>
              <p style={{ fontSize: '13px', marginTop: '6px' }}>
                Add fresh farm vegetables, fruits, and bakery to start!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = './favicon.png'; }}
                  />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff' }}>{item.name}</h4>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>₹{item.price} · {item.pack}</span>
                  </div>
                </div>

                <div className="qty-control">
                  <button className="qty-btn" onClick={() => updateCartQty(item.id, -1)}>
                    <Minus size={12} />
                  </button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateCartQty(item.id, 1)}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div style={{ marginTop: '14px', background: 'rgba(30,41,59,0.5)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                Delivery Slot
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Express 90 min', 'Evening 6-8 PM', 'Tomorrow 7-9 AM'].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: selectedSlot === slot ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                      background: selectedSlot === slot ? 'rgba(16,185,129,0.15)' : '#0f172a',
                      color: selectedSlot === slot ? '#10b981' : '#cbd5e1',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {slot === 'Express 90 min' && '⚡ '}{slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="bill-row">
              <span>Item Subtotal</span>
              <span>₹{itemTotal}</span>
            </div>
            <div className="bill-row">
              <span>Insulated Chilled Packaging</span>
              <span>₹{packagingFee}</span>
            </div>
            <div className="bill-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹${deliveryFee}`}</span>
            </div>
            <div className="bill-row bill-total">
              <span>To Pay</span>
              <span>₹{grandTotal}</span>
            </div>

            <button className="btn-checkout" onClick={handleCheckout}>
              <span>Proceed to Pay (UPI / Card)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
