import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import Storefront from './pages/Storefront';
import TrackOrder from './pages/TrackOrder';
import WarehouseOps from './pages/WarehouseOps';
import RiderPortal from './pages/RiderPortal';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'track' | 'ops' | 'rider'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toastMsg } = useApp();

  return (
    <div className="app-container">
      {/* Top App Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        setIsCartOpen={setIsCartOpen}
      />

      {/* Main Screen Views */}
      <main style={{ flex: 1 }}>
        {currentView === 'store' && (
          <Storefront onNavigateToTrack={() => setCurrentView('track')} />
        )}
        {currentView === 'track' && (
          <TrackOrder onOpenRiderPortal={() => setCurrentView('rider')} />
        )}
        {currentView === 'ops' && (
          <WarehouseOps onOpenRiderPortal={() => setCurrentView('rider')} />
        )}
        {currentView === 'rider' && (
          <RiderPortal />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderPlaced={() => setCurrentView('track')}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Toast Notification */}
      {toastMsg && (
        <div className="app-toast">
          <CheckCircle size={16} />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
