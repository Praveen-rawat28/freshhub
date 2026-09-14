import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

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
    rating: 4.9
  }
];

const INITIAL_RIDERS = [
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

const INITIAL_ORDERS = [
  {
    id: 'FH-88231',
    customer: 'You (demo customer)',
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
      { at: '12:04 PM', msg: 'Order confirmed & assigned to WH-2 dark store' },
      { at: '12:15 PM', msg: 'Packed into chilled crates' },
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
    state: 'NEW',
    crates: 1,
    lines: [
      { id: 'mango-alphonso', name: 'Ratnagiri Alphonso Mango', pack: '3 pc', qty: 1, price: 246 }
    ],
    events: [
      { at: '12:35 PM', msg: 'Order received at WH-2 · Waiting for rider assignment' }
    ]
  }
];

export function AppProvider({ children }) {
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

  // Active Logged-in Rider
  const [activeRider, setActiveRider] = useState(() => {
    const saved = localStorage.getItem('freshhub_active_rider');
    return saved ? JSON.parse(saved) : INITIAL_RIDERS[0];
  });

  // Rider duty status
  const [isRiderOnline, setIsRiderOnline] = useState(() => {
    const saved = localStorage.getItem('freshhub_rider_duty');
    return saved === null || saved === 'true';
  });

  // Toast
  const [toastMsg, setToastMsg] = useState(null);

  // Sync to localStorage
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
    } else {
      localStorage.removeItem('freshhub_active_rider');
    }
  }, [activeRider]);

  useEffect(() => {
    localStorage.setItem('freshhub_rider_duty', isRiderOnline ? 'true' : 'false');
  }, [isRiderOnline]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
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

  // Checkout / Place Order
  const placeOrder = (slot = 'Express 90 min') => {
    if (cart.length === 0) return null;

    const newId = `FH-${Math.floor(88240 + Math.random() * 700)}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: newId,
      customer: 'You (demo customer)',
      addr: 'Tower B, Flat 1204, Central Park · Sector 43, Gurugram',
      phone: '+91 98990 12345',
      channel: 'D2C',
      wh: 'WH-2',
      slot,
      placedAt: timeNow,
      payMode: 'UPI',
      state: 'NEW',
      crates: Math.max(1, Math.ceil(cart.length / 2)),
      lines: [...cart],
      events: [
        { at: timeNow, msg: 'Order placed · Allocated to Sector 57 WH-2 dark store' }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order ${newId} placed successfully!`);
    return newOrder;
  };

  // Rider Actions
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
    showToast(`Order ${orderId} accepted! Proceed to warehouse for pickup.`);
  };

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
              { at: timeNow, msg: `Crates checked out of dark store. Out for delivery.` }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} picked up! Now Out for Delivery.`);
  };

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

    // Update active rider metrics
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

    showToast(`Delivery completed! ₹${earnedAmount} added to your balance.`);
  };

  // Register New Rider
  const registerRider = (riderData) => {
    const initials = riderData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'RP';

    const newRider = {
      id: `rider-${Date.now()}`,
      ...riderData,
      rating: 5.0,
      totalDeliveries: 0,
      todayDeliveries: 0,
      todayEarnings: 0,
      lifetimeEarnings: 0,
      balance: 100, // Joining bonus
      avatar: initials
    };

    setRiders((prev) => [newRider, ...prev]);
    setActiveRider(newRider);
    setIsRiderOnline(true);
    showToast(`Welcome ${newRider.name}! ₹100 joining bonus credited.`);
  };

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
        products,
        cart,
        addToCart,
        updateCartQty,
        clearCart,
        orders,
        placeOrder,
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
