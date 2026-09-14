import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import RoleSwitcher from './components/RoleSwitcher';
import CustomerPanel from './panels/CustomerPanel';
import RiderPanel from './panels/RiderPanel';
import StaffPanel from './panels/StaffPanel';
import AdminPanel from './panels/AdminPanel';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const { currentRole, toastMsg, isAuthModalOpen, setIsAuthModalOpen } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Top App Header with Role Context */}
      <Navbar setIsCartOpen={setIsCartOpen} />

      {/* Main Panel View based on Authorization Role */}
      <main style={{ flex: 1 }}>
        {currentRole === 'customer' && (
          <CustomerPanel onOpenCart={() => setIsCartOpen(true)} />
        )}
        {currentRole === 'rider' && (
          <RiderPanel />
        )}
        {currentRole === 'staff' && (
          <StaffPanel />
        )}
        {currentRole === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Floating Role Switcher Pill & Modal */}
      <RoleSwitcher />

      {/* Customer Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderPlaced={() => {}}
      />

      {/* Customer Profile & Logout Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Mobile Bottom Navigation tailored to Role */}
      <BottomNav />

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
