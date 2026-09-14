import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Truck, CheckCircle2, Clock, MapPin, DollarSign, Wallet, Star, ShieldCheck, ArrowRight, LogOut, UserPlus, LogIn } from 'lucide-react';

export default function RiderPortal() {
  const {
    orders,
    riders,
    activeRider,
    setActiveRider,
    isRiderOnline,
    setIsRiderOnline,
    acceptOrderAsRider,
    pickupOrderAsRider,
    completeOrderAsRider,
    registerRider,
    cashoutRiderBalance,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'earnings' | 'login' | 'register'
  const [regForm, setRegForm] = useState({
    name: '',
    phone: '',
    vehicle: 'Ather 450X (Electric)',
    vehicleType: 'EV Scooter',
    hub: 'WH-2 · Sector 57 Gurugram',
    license: '',
    upi: ''
  });

  // If no rider logged in and not on register tab, default to login
  const currentTab = !activeRider && activeTab !== 'register' ? 'login' : activeTab;

  const myActiveOrders = activeRider
    ? orders.filter((o) => o.riderId === activeRider.id && o.state !== 'DELIVERED')
    : [];

  const availableOrders = orders.filter(
    (o) => (!o.riderId || o.riderId === '') && o.state !== 'DELIVERED'
  );

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone) return;
    registerRider(regForm);
    setActiveTab('tasks');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Rider Top Navigation */}
      <div style={{
        background: 'rgba(30,41,59,0.8)',
        borderRadius: '16px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🛵
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>FreshHub Delivery Fleet</h3>
            <p style={{ fontSize: '11px', color: '#10b981', fontWeight: '700', textTransform: 'uppercase' }}>
              Partner Console & Earnings
            </p>
          </div>
        </div>

        {activeRider ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setIsRiderOnline(!isRiderOnline)}
              style={{
                background: isRiderOnline ? '#10b981' : '#475569',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: isRiderOnline ? '0 0 12px rgba(16,185,129,0.4)' : 'none'
              }}
            >
              {isRiderOnline ? '🟢 Online' : '⚪ Offline'}
            </button>

            <button
              onClick={() => {
                setActiveRider(null);
                showToast('Logged out of Rider Portal');
              }}
              style={{
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                border: '1px solid rgba(239,68,68,0.3)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                background: currentTab === 'login' ? '#10b981' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              style={{
                background: currentTab === 'register' ? '#10b981' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Sub Tabs */}
      {activeRider && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('tasks')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: activeTab === 'tasks' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === 'tasks' ? 'rgba(16,185,129,0.15)' : 'rgba(30,41,59,0.5)',
              color: activeTab === 'tasks' ? '#10b981' : '#94a3b8',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            📦 Deliveries & Tasks ({myActiveOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: activeTab === 'earnings' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
              background: activeTab === 'earnings' ? 'rgba(16,185,129,0.15)' : 'rgba(30,41,59,0.5)',
              color: activeTab === 'earnings' ? '#10b981' : '#94a3b8',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            💰 Earnings & Payouts
          </button>
        </div>
      )}

      {/* 1. LOGIN SCREEN */}
      {currentTab === 'login' && !activeRider && (
        <div style={{
          maxWidth: '480px',
          margin: '20px auto',
          background: 'rgba(30,41,59,0.7)',
          padding: '28px',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
            Rider Partner Sign In
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
            Choose a demo rider or sign in to start delivering fresh produce.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
              ⚡ 1-Click Quick Demo Riders:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {riders.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setActiveRider(r);
                    setIsRiderOnline(true);
                    setActiveTab('tasks');
                    showToast(`Logged in as ${r.name}`);
                  }}
                  style={{
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>🛵 {r.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.vehicleType} · {r.hub.split('·')[0]}</div>
                  </div>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>Select →</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '16px' }}>
            New to FreshHub?{' '}
            <button
              onClick={() => setActiveTab('register')}
              style={{ background: 'transparent', border: 'none', color: '#10b981', fontWeight: '700', cursor: 'pointer' }}
            >
              Register as Partner
            </button>
          </div>
        </div>
      )}

      {/* 2. REGISTRATION SCREEN */}
      {currentTab === 'register' && (
        <div style={{
          maxWidth: '520px',
          margin: '20px auto',
          background: 'rgba(30,41,59,0.7)',
          padding: '28px',
          borderRadius: '18px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
            Delivery Partner Registration
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
            Earn up to ₹35,000/month with flexible hours and instant daily UPI payouts.
          </p>

          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Vikram Singh"
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                required
                style={{ width: '100%', padding: '10px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="+91 98990 12345"
                value={regForm.phone}
                onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                required
                style={{ width: '100%', padding: '10px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                Vehicle Owned
              </label>
              <select
                value={regForm.vehicle}
                onChange={(e) => setRegForm({ ...regForm, vehicle: e.target.value, vehicleType: e.target.value.split(' ')[0] })}
                style={{ width: '100%', padding: '10px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              >
                <option value="Ather 450X (Electric)">Electric Scooter / EV (Zero Emissions)</option>
                <option value="Hero Splendor (Motorcycle)">Motorcycle (100-125cc)</option>
                <option value="Eco Bicycle">Eco Bicycle (Short Radius)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                Driving License / ID Proof Number
              </label>
              <input
                type="text"
                placeholder="HR-26-2023-009988"
                value={regForm.license}
                onChange={(e) => setRegForm({ ...regForm, license: e.target.value })}
                required
                style={{ width: '100%', padding: '10px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                UPI ID for Instant Daily Payouts
              </label>
              <input
                type="text"
                placeholder="yourname@okhdfcbank"
                value={regForm.upi}
                onChange={(e) => setRegForm({ ...regForm, upi: e.target.value })}
                required
                style={{ width: '100%', padding: '10px 12px', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#ffffff' }}
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Complete Registration & Start Delivering
            </button>
          </form>
        </div>
      )}

      {/* 3. DELIVERIES & WORKFLOW TAB */}
      {activeRider && currentTab === 'tasks' && (
        <div>
          {/* Active Tasks */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
              🚀 My Active Delivery Task ({myActiveOrders.length})
            </h3>

            {myActiveOrders.length === 0 ? (
              <div style={{ background: 'rgba(30,41,59,0.5)', padding: '30px', borderRadius: '14px', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
                <h4>No active deliveries right now</h4>
                <p style={{ fontSize: '12px', marginTop: '4px' }}>
                  Accept an order from the available list below to start earning!
                </p>
              </div>
            ) : (
              myActiveOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.35)',
                    borderRadius: '16px',
                    padding: '20px',
                    marginBottom: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '800', color: '#10b981' }}>{order.id}</span>
                      <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>
                        {order.slot}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>
                        ₹{55 + (order.crates > 1 ? (order.crates - 1) * 15 : 0) + 20 + 35}
                      </span>
                      <div style={{ fontSize: '10px', color: '#94a3b8' }}>Payout on delivery</div>
                    </div>
                  </div>

                  <div style={{ paddingLeft: '12px', borderLeft: '2px dashed rgba(255,255,255,0.2)', marginBottom: '16px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Pick Up From</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>WH-2 Sector 57 Gurugram Dark Store</div>
                      <div style={{ fontSize: '11px', color: '#f59e0b' }}>{order.crates || 1} Chilled crate(s)</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Deliver To</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>{order.customer}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{order.addr}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {order.state === 'PICKING' ? (
                      <button
                        onClick={() => pickupOrderAsRider(order.id)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        🏭 Confirm Crate Pickup from Warehouse
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            const query = encodeURIComponent(order.addr || 'Sector 43 Gurugram');
                            window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                          }}
                          style={{
                            padding: '12px 18px',
                            background: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          🗺️ Map GPS
                        </button>

                        <button
                          onClick={() => completeOrderAsRider(order.id)}
                          style={{
                            flex: 1,
                            padding: '12px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          ✅ Confirm Handover & Complete Delivery
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Available Orders */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
              📍 Orders Ready for Delivery at Dark Store ({availableOrders.length})
            </h3>

            {!isRiderOnline ? (
              <div style={{ background: 'rgba(30,41,59,0.5)', padding: '24px', borderRadius: '14px', textAlign: 'center', color: '#94a3b8' }}>
                <p>You are currently <strong>Offline</strong>. Switch to Online above to receive orders.</p>
              </div>
            ) : availableOrders.length === 0 ? (
              <div style={{ background: 'rgba(30,41,59,0.5)', padding: '24px', borderRadius: '14px', textAlign: 'center', color: '#94a3b8' }}>
                <p>All current orders are assigned! Check back in a few minutes or place a test order in the Storefront.</p>
              </div>
            ) : (
              availableOrders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: 'rgba(30,41,59,0.6)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '800', color: '#10b981' }}>{order.id}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{order.slot}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>
                      {order.customer} · {order.addr}
                    </div>
                    <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '2px' }}>
                      Est. Payout: ₹{55 + (order.crates > 1 ? (order.crates - 1) * 15 : 0) + 20 + 30}
                    </div>
                  </div>

                  <button
                    onClick={() => acceptOrderAsRider(order.id)}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Accept Order
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. EARNINGS & PAYOUTS TAB */}
      {activeRider && currentTab === 'earnings' && (
        <div>
          {/* Wallet Cashout Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.1))',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
                Withdrawable Balance: ₹{activeRider.balance}
              </div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
                Instant payout to <strong>{activeRider.upi}</strong>
              </p>
            </div>

            <button
              onClick={cashoutRiderBalance}
              disabled={activeRider.balance <= 0}
              style={{
                background: activeRider.balance > 0 ? '#10b981' : '#475569',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: activeRider.balance > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              💸 Instant Bank Cashout
            </button>
          </div>

          {/* KPI Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(30,41,59,0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Today's Earnings</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>₹{activeRider.todayEarnings}</div>
              <div style={{ fontSize: '11px', color: '#10b981' }}>{activeRider.todayDeliveries} trips today</div>
            </div>

            <div style={{ background: 'rgba(30,41,59,0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Lifetime Total</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>₹{activeRider.lifetimeEarnings.toLocaleString()}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>{activeRider.totalDeliveries} total orders</div>
            </div>

            <div style={{ background: 'rgba(30,41,59,0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#94a3b8' }}>Rating & On-Time</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>⭐ {activeRider.rating}</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>98.8% On-time score</div>
            </div>
          </div>

          {/* Rate Card */}
          <div style={{
            background: 'rgba(30,41,59,0.5)',
            padding: '18px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>
              FreshHub Delivery Compensation Structure
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Base Pay</span>
                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '14px' }}>₹55 / order</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Crate Bonus</span>
                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '14px' }}>+₹15 / crate</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Express Incentive</span>
                <div style={{ fontWeight: '700', color: '#ffffff', fontSize: '14px' }}>+₹20 / order</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Customer Tips</span>
                <div style={{ fontWeight: '700', color: '#10b981', fontSize: '14px' }}>100% Passed On</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
