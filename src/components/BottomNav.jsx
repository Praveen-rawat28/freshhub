import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Store, Clock, User, Truck, DollarSign, PackageCheck, Boxes, TrendingUp, ShieldCheck } from 'lucide-react';

export default function BottomNav() {
  const { currentRole, setIsRoleSwitcherOpen, setIsAuthModalOpen } = useApp();

  return (
    <nav className="mobile-bottom-nav">
      {currentRole === 'customer' && (
        <>
          <button
            className="mobile-nav-item active"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="icon"><Store size={20} /></span>
            <span>Store</span>
          </button>
          <button
            className="mobile-nav-item"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <span className="icon"><User size={20} /></span>
            <span>Account</span>
          </button>
          <button
            className="mobile-nav-item"
            onClick={() => setIsRoleSwitcherOpen(true)}
          >
            <span className="icon"><ShieldCheck size={20} /></span>
            <span>Switch Role</span>
          </button>
        </>
      )}

      {currentRole === 'rider' && (
        <>
          <button
            className="mobile-nav-item active"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="icon"><Truck size={20} /></span>
            <span>Deliveries</span>
          </button>
          <button
            className="mobile-nav-item"
            onClick={() => setIsRoleSwitcherOpen(true)}
          >
            <span className="icon"><ShieldCheck size={20} /></span>
            <span>Switch Role</span>
          </button>
        </>
      )}

      {currentRole === 'staff' && (
        <>
          <button
            className="mobile-nav-item active"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="icon"><PackageCheck size={20} /></span>
            <span>Packing</span>
          </button>
          <button
            className="mobile-nav-item"
            onClick={() => setIsRoleSwitcherOpen(true)}
          >
            <span className="icon"><ShieldCheck size={20} /></span>
            <span>Switch Role</span>
          </button>
        </>
      )}

      {currentRole === 'admin' && (
        <>
          <button
            className="mobile-nav-item active"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="icon"><TrendingUp size={20} /></span>
            <span>Analytics</span>
          </button>
          <button
            className="mobile-nav-item"
            onClick={() => setIsRoleSwitcherOpen(true)}
          >
            <span className="icon"><ShieldCheck size={20} /></span>
            <span>Switch Role</span>
          </button>
        </>
      )}
    </nav>
  );
}
