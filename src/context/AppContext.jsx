import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const ROLE_PROFILES = {
  customer: {
    role: 'customer',
    name: 'Praveen Rawat',
    phone: '+91 98990 12345',
    email: 'praveen.rawat@freshhub.in',
    address: 'Tower B, Flat 1204, Central Park · Sector 43, Gurugram',
    title: 'Verified Customer',
    badge: '🛍️ Customer',
    avatar: 'PR'
  },
  rider: {
    role: 'rider',
    name: 'Sahil Kumar',
    phone: '+91 98765 43210',
    email: 'sahil.delivery@freshhub.in',
    vehicle: 'Ather 450X (EV Scooter)',
    vehicleType: 'EV Scooter',
    hub: 'WH-2 · Sector 57 Gurugram',
    title: 'Delivery Partner',
    badge: '🛵 Rider',
    avatar: 'SK'
  },
  staff: {
    role: 'staff',
    name: 'Neha Verma',
    phone: '+91 98333 44556',
    email: 'neha.ops@freshhub.in',
    station: 'WH-2 Dark Store · Cold Room Station 4',
    title: 'Warehouse Lead / Picker',
    badge: '🏭 Staff',
    avatar: 'NV'
  },
  admin: {
    role: 'admin',
    name: 'Vansh Bhati',
    phone: '+91 98111 99999',
    email: 'vansh.admin@freshhub.in',
    title: 'Operations Director',
    badge: '👑 Admin',
    avatar: 'VB'
  }
};

export const INITIAL_PRODUCTS = [
  {
    id: 'tomato-hybrid',
    name: 'Tomato Hybrid',
    category: 'vegetables',
    pack: '1 kg',
    price: 41,
    mrp: 55,
    img: './img/p-tomato.jpg',
    batch: 'BAT-TM-092 · Grade A',
    origin: 'Nashik Farm',
    shelfLife: '3 Days',
    stockKg: 480,
    rating: 4.8
  },
  {
    id: 'spinach-fresh',
    name: 'Farm Spinach Bunch',
    category: 'leafy',
    pack: '2 bunches (~500g)',
    price: 36,
    mrp: 48,
    img: './img/p-spinach.jpg',
    batch: 'BAT-SP-114 · Hydroponic',
    origin: 'Sonipat Hub',
    shelfLife: '2 Days',
    stockKg: 120,
    rating: 4.9
  },
  {
    id: 'onion-sambhar',
    name: 'Nasik Red Onion',
    category: 'vegetables',
    pack: '1 kg',
    price: 38,
    mrp: 50,
    img: './img/p-onion.jpg',
    batch: 'BAT-ON-884 · Cured',
    origin: 'Lasalgaon Mandi',
    shelfLife: '14 Days',
    stockKg: 650,
    rating: 4.7
  },
  {
    id: 'mango-alphonso',
    name: 'Ratnagiri Alphonso Mango',
    category: 'fruits',
    pack: '3 pc (~650g)',
    price: 246,
    mrp: 320,
    img: './img/p-mango.jpg',
    batch: 'BAT-MG-412 · GI Tagged',
    origin: 'Ratnagiri Orchards',
    shelfLife: '4 Days',
    stockKg: 210,
    rating: 5.0
  },
  {
    id: 'chopped-onion',
    name: 'Diced Red Onion (Ready to Cook)',
    category: 'cut',
    pack: '250 g vacuum pack',
    price: 29,
    mrp: 38,
    img: './img/p-chopped-onion.jpg',
    batch: 'BAT-CUT-009 · Clean Room',
    origin: 'WH-2 Fresh Kitchen',
    shelfLife: '36 Hours',
    stockKg: 85,
    rating: 4.8
  },
  {
    id: 'mixveg-prep',
    name: 'Stir Fry Cut Vegetable Mix',
    category: 'cut',
    pack: '400 g',
    price: 68,
    mrp: 85,
    img: './img/p-mixveg.jpg',
    batch: 'BAT-CUT-012 · Chilled 4°C',
    origin: 'WH-2 Fresh Kitchen',
    shelfLife: '48 Hours',
    stockKg: 95,
    rating: 4.9
  },
  {
    id: 'artisan-bread',
    name: 'Whole Wheat Sourdough Loaf',
    category: 'bakery',
    pack: '400 g',
    price: 75,
    mrp: 95,
    img: './img/p-bread.jpg',
    batch: 'BAT-BK-701 · Baked 5 AM',
    origin: 'Artisan Bakehouse',
    shelfLife: '3 Days',
    stockKg: 40,
    rating: 4.9
  }
];

export const INITIAL_RIDERS = [
  {
    id: 'rider-sahil',
    name: 'Sahil Kumar',
    phone: '+91 98765 43210',
    vehicle: 'Ather 450X (Electric)',
    vehicleType: 'EV Scooter',
    hub: 'WH-2 · Sector 57 Gurugram',
    license: 'HR-26-2021-008912',
    upi: 'sahil.kumar@okhdfcbank',
    rating: 4.94,
    totalDeliveries: 428,
    todayDeliveries: 8,
    todayEarnings: 685,
    lifetimeEarnings: 32450,
    balance: 1460,
    avatar: 'SK'
  },
  {
    id: 'rider-arjun',
    name: 'Arjun Patel',
    phone: '+91 98111 22334',
    vehicle: 'Hero Splendor Plus',
    vehicleType: 'Motorcycle',
    hub: 'WH-1 · DLF Phase 3 Gurugram',
    license: 'HR-55-2020-004419',
    upi: 'arjun.patel@okaxis',
    rating: 4.88,
    totalDeliveries: 612,
    todayDeliveries: 11,
    todayEarnings: 890,
    lifetimeEarnings: 46200,
    balance: 2150,
    avatar: 'AP'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'FH-88231',
    customer: 'Praveen Rawat',
    addr: 'Tower B, Flat 1204, Central Park · Sector 43, Gurugram',
    phone: '+91 98990 12345',
    channel: 'D2C',
    wh: 'WH-2',
    slot: 'Express 90 min',
    placedAt: '12:04 PM',
    payMode: 'UPI',
    state: 'OUT_FOR_DELIVERY',
    riderId: 'rider-sahil',
    riderName: 'Sahil Kumar',
    crates: 2,
    lines: [
      { id: 'tomato-hybrid', name: 'Tomato Hybrid', pack: '1 kg', qty: 1, price: 41 },
      { id: 'spinach-fresh', name: 'Farm Spinach Bunch', pack: '2 bunches', qty: 1, price: 36 }
    ],
    events: [
      { at: '12:04 PM', msg: 'Order placed by customer · Dark store allocated' },
      { at: '12:15 PM', msg: 'Packed into chilled crates by Neha Verma (WH-2)' },
      { at: '12:22 PM', msg: 'Handed over to Sahil Kumar · In Transit' }
    ]
  },
  {
    id: 'FH-88235',
    customer: 'Ritu Sen',
    addr: 'Sector 56, Huda Colony, Gurugram',
    phone: '+91 98123 45678',
    channel: 'D2C',
    wh: 'WH-2',
    slot: 'Express 90 min',
    placedAt: '12:35 PM',
    payMode: 'UPI',
    state: 'READY_FOR_PICKUP',
    crates: 1,
    lines: [
      { id: 'mango-alphonso', name: 'Ratnagiri Alphonso Mango', pack: '3 pc', qty: 1, price: 246 }
    ],
    events: [
      { at: '12:35 PM', msg: 'Order received at WH-2' },
      { at: '12:42 PM', msg: 'Packed into Crate #CR-44 · Waiting for rider pickup' }
    ]
  },
  {
    id: 'FH-88238',
    customer: 'Amit Khurana',
    addr: 'DLF Phase 4, Block B, Gurugram',
    phone: '+91 98777 66554',
    channel: 'D2C',
    wh: 'WH-1',
    slot: 'Evening 6-8 PM',
    placedAt: '01:10 PM',
    payMode: 'Card',
    state: 'NEW',
    crates: 1,
    lines: [
      { id: 'artisan-bread', name: 'Whole Wheat Sourdough Loaf', pack: '400 g', qty: 1, price: 75 },
      { id: 'mixveg-prep', name: 'Stir Fry Cut Vegetable Mix', pack: '400 g', qty: 1, price: 68 }
    ],
    events: [
      { at: '01:10 PM', msg: 'Order placed · Awaiting warehouse packing' }
    ]
  }
];

export function AppProvider({ children }) {
  // Theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('freshhub_theme') || 'dark';
  });

  // Current Role: 'customer' | 'rider' | 'staff' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('freshhub_active_role') || 'customer';
  });

  // Role Profile
  const [userProfile, setUserProfile] = useState(() => {
    const savedRole = localStorage.getItem('freshhub_active_role') || 'customer';
    return ROLE_PROFILES[savedRole] || ROLE_PROFILES.customer;
  });

  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Products
  const [products] = useState(() => {
    const saved = localStorage.getItem('freshhub_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('freshhub_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Riders
  const [riders, setRiders] = useState(() => {
    const saved = localStorage.getItem('freshhub_riders');
    return saved ? JSON.parse(saved) : INITIAL_RIDERS;
  });

  // Active Rider profile when role === 'rider'
  const [activeRider, setActiveRider] = useState(() => {
    const saved = localStorage.getItem('freshhub_active_rider');
    return saved ? JSON.parse(saved) : INITIAL_RIDERS[0];
  });

  // Rider duty status
  const [isRiderOnline, setIsRiderOnline] = useState(() => {
    const saved = localStorage.getItem('freshhub_rider_duty');
    return saved === null || saved === 'true';
  });

  // Apply theme to document root
  useEffect(() => {
    localStorage.setItem('freshhub_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('freshhub_active_role', currentRole);
    setUserProfile(ROLE_PROFILES[currentRole] || ROLE_PROFILES.customer);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('freshhub_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('freshhub_riders', JSON.stringify(riders));
  }, [riders]);

  useEffect(() => {
    if (activeRider) {
      localStorage.setItem('freshhub_active_rider', JSON.stringify(activeRider));
    }
  }, [activeRider]);

  useEffect(() => {
    localStorage.setItem('freshhub_rider_duty', isRiderOnline ? 'true' : 'false');
  }, [isRiderOnline]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Switch Role
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    const profile = ROLE_PROFILES[newRole] || ROLE_PROFILES.customer;
    setUserProfile(profile);
    setIsRoleSwitcherOpen(false);
    showToast(`Switched to ${profile.badge} Panel`);
  };

  // Cart Helpers
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const updateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  // Customer: Place Order
  const placeOrder = (slot = 'Express 90 min') => {
    if (cart.length === 0) return null;

    const newId = `FH-${Math.floor(88240 + Math.random() * 700)}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: newId,
      customer: userProfile.name || 'Customer',
      addr: userProfile.address || 'Tower B, Flat 1204, Central Park · Sector 43, Gurugram',
      phone: userProfile.phone || '+91 98990 12345',
      channel: 'D2C',
      wh: 'WH-2',
      slot,
      placedAt: timeNow,
      payMode: 'UPI',
      state: 'NEW',
      crates: Math.max(1, Math.ceil(cart.length / 2)),
      lines: [...cart],
      events: [
        { at: timeNow, msg: 'Order placed by customer · Dark store packing allocated' }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order ${newId} placed successfully!`);
    return newOrder;
  };

  // Staff: Pack Order
  const packOrderAsStaff = (orderId) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            state: 'READY_FOR_PICKUP',
            events: [
              ...ord.events,
              { at: timeNow, msg: `Packed into chilled crate(s) by ${userProfile.name} (Warehouse Staff)` }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} packed and staged for rider pickup!`);
  };

  // Rider: Accept Order
  const acceptOrderAsRider = (orderId) => {
    if (!activeRider) return;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            state: 'PICKING',
            riderId: activeRider.id,
            riderName: activeRider.name,
            events: [
              ...ord.events,
              { at: timeNow, msg: `Accepted by rider ${activeRider.name} (${activeRider.vehicleType})` }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} assigned to you! Proceed to dark store.`);
  };

  // Rider: Pickup from Dark store
  const pickupOrderAsRider = (orderId) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            state: 'OUT_FOR_DELIVERY',
            events: [
              ...ord.events,
              { at: timeNow, msg: `Crates verified and picked up from warehouse. Out for delivery.` }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} picked up! Now Out for Delivery.`);
  };

  // Rider: Complete Delivery
  const completeOrderAsRider = (orderId) => {
    if (!activeRider) return;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let earnedAmount = 115;
    const targetOrder = orders.find((o) => o.id === orderId);
    if (targetOrder) {
      const crates = targetOrder.crates || 1;
      earnedAmount = 55 + (crates > 1 ? (crates - 1) * 15 : 0) + 20 + 35;
    }

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            state: 'DELIVERED',
            events: [
              ...ord.events,
              { at: timeNow, msg: `Delivered safely to customer by ${activeRider.name}.` }
            ]
          };
        }
        return ord;
      })
    );

    const updatedRider = {
      ...activeRider,
      todayDeliveries: activeRider.todayDeliveries + 1,
      totalDeliveries: activeRider.totalDeliveries + 1,
      todayEarnings: activeRider.todayEarnings + earnedAmount,
      lifetimeEarnings: activeRider.lifetimeEarnings + earnedAmount,
      balance: activeRider.balance + earnedAmount
    };

    setActiveRider(updatedRider);
    setRiders((prev) =>
      prev.map((r) => (r.id === updatedRider.id ? updatedRider : r))
    );

    showToast(`Delivery completed! ₹${earnedAmount} credited to your wallet.`);
  };

  // Admin: Cancel / Override Order
  const cancelOrderAsAdmin = (orderId) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            state: 'CANCELLED',
            events: [
              ...ord.events,
              { at: timeNow, msg: `Cancelled by Administrator (${userProfile.name})` }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} cancelled by Admin`);
  };

  // Reset demo data
  const resetDemoData = () => {
    setOrders(INITIAL_ORDERS);
    setRiders(INITIAL_RIDERS);
    setActiveRider(INITIAL_RIDERS[0]);
    localStorage.setItem('orders', JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem('freshhub_riders', JSON.stringify(INITIAL_RIDERS));
    showToast('Demo data restored to initial state');
  };

  // Rider Cashout
  const cashoutRiderBalance = () => {
    if (!activeRider || activeRider.balance <= 0) return;
    const cashed = activeRider.balance;
    const updated = { ...activeRider, balance: 0 };
    setActiveRider(updated);
    setRiders((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    showToast(`₹${cashed} transferred instantly to ${activeRider.upi}!`);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentRole,
        switchRole,
        userProfile,
        isRoleSwitcherOpen,
        setIsRoleSwitcherOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        products,
        cart,
        addToCart,
        updateCartQty,
        clearCart,
        orders,
        placeOrder,
        packOrderAsStaff,
        riders,
        activeRider,
        setActiveRider,
        isRiderOnline,
        setIsRiderOnline,
        acceptOrderAsRider,
        pickupOrderAsRider,
        completeOrderAsRider,
        cancelOrderAsAdmin,
        resetDemoData,
        cashoutRiderBalance,
        toastMsg,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
