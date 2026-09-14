/**
 * FreshHub Rider Delivery Partner System
 * Comprehensive Registration, Authentication, Delivery Console & Earnings Dashboard
 */

(function () {
  'use strict';

  // Key storage names
  const STORAGE_KEY_RIDERS = 'freshhub_riders';
  const STORAGE_KEY_ACTIVE_RIDER = 'freshhub_active_rider';
  const STORAGE_KEY_DUTY = 'freshhub_rider_duty';
  const STORAGE_KEY_LEDGER = 'freshhub_rider_ledger_';

  // Initial Demo Riders
  const DEFAULT_RIDERS = [
    {
      id: 'rider-sahil',
      name: 'Sahil Kumar',
      phone: '+91 98765 43210',
      vehicle: 'Electric Scooter (Ather 450X)',
      vehicleType: 'EV Scooter',
      hub: 'WH-2 · Sector 57 Gurugram',
      license: 'HR-26-2021-008912',
      upi: 'sahil.kumar@okhdfcbank',
      rating: 4.94,
      joinedDate: 'Jan 2026',
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
      joinedDate: 'Nov 2025',
      totalDeliveries: 612,
      todayDeliveries: 11,
      todayEarnings: 890,
      lifetimeEarnings: 46200,
      balance: 2150,
      avatar: 'AP'
    },
    {
      id: 'rider-mohit',
      name: 'Mohit Verma',
      phone: '+91 98444 55667',
      vehicle: 'Eco Cargo Bicycle',
      vehicleType: 'Bicycle',
      hub: 'WH-2 · Sector 57 Gurugram',
      license: 'HR-26-2022-001290',
      upi: 'mohit.verma@paytm',
      rating: 4.96,
      joinedDate: 'Feb 2026',
      totalDeliveries: 230,
      todayDeliveries: 5,
      todayEarnings: 420,
      lifetimeEarnings: 18100,
      balance: 840,
      avatar: 'MV'
    }
  ];

  // Default historical delivery entries for ledger
  const DEFAULT_HISTORY = [
    {
      orderId: 'FH-88226',
      customer: 'Rohit M.',
      address: 'Sector 57, Gurugram',
      slot: 'Express 90 min',
      crates: 1,
      basePay: 55,
      crateBonus: 0,
      slotBonus: 20,
      tip: 40,
      total: 115,
      status: 'PAID',
      time: '09:48 AM',
      date: 'Today'
    },
    {
      orderId: 'FH-88219',
      customer: 'Pooja Singhania',
      address: 'Sushant Lok 1, Block C',
      slot: 'Morning 7-9 AM',
      crates: 2,
      basePay: 55,
      crateBonus: 15,
      slotBonus: 10,
      tip: 30,
      total: 110,
      status: 'PAID',
      time: '08:35 AM',
      date: 'Today'
    },
    {
      orderId: 'FH-88214',
      customer: 'Anita R.',
      address: 'DLF Phase 3, Gurugram',
      slot: 'Express 90 min',
      crates: 3,
      basePay: 55,
      crateBonus: 30,
      slotBonus: 20,
      tip: 50,
      total: 155,
      status: 'PAID',
      time: '07:50 AM',
      date: 'Today'
    },
    {
      orderId: 'FH-88209',
      customer: 'Neha J.',
      address: 'South City 2, Gurugram',
      slot: 'Evening 6-8 PM',
      crates: 2,
      basePay: 55,
      crateBonus: 15,
      slotBonus: 0,
      tip: 25,
      total: 95,
      status: 'PAID',
      time: '06:45 PM',
      date: 'Yesterday'
    }
  ];

  // Helper State Management
  function getRiders() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_RIDERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEY_RIDERS, JSON.stringify(DEFAULT_RIDERS));
        return DEFAULT_RIDERS;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_RIDERS;
    }
  }

  function saveRiders(riders) {
    localStorage.setItem(STORAGE_KEY_RIDERS, JSON.stringify(riders));
  }

  function getActiveRider() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ACTIVE_RIDER);
      if (!data) {
        const riders = getRiders();
        const def = riders[0];
        localStorage.setItem(STORAGE_KEY_ACTIVE_RIDER, JSON.stringify(def));
        return def;
      }
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }

  function setActiveRider(rider) {
    if (rider) {
      localStorage.setItem(STORAGE_KEY_ACTIVE_RIDER, JSON.stringify(rider));
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_RIDER);
    }
  }

  function isRiderOnline() {
    const duty = localStorage.getItem(STORAGE_KEY_DUTY);
    return duty === null || duty === 'true';
  }

  function setRiderOnline(status) {
    localStorage.setItem(STORAGE_KEY_DUTY, status ? 'true' : 'false');
  }

  function getRiderLedger(riderId) {
    try {
      const key = STORAGE_KEY_LEDGER + riderId;
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(DEFAULT_HISTORY));
        return DEFAULT_HISTORY;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_HISTORY;
    }
  }

  function addRiderLedgerEntry(riderId, entry) {
    const ledger = getRiderLedger(riderId);
    ledger.unshift(entry);
    localStorage.setItem(STORAGE_KEY_LEDGER + riderId, JSON.stringify(ledger));
  }

  // Active Tab state: 'orders' | 'earnings' | 'profile' | 'login' | 'register'
  let currentTab = 'orders';

  // Toast Notification
  function showRiderToast(message, isSuccess = true) {
    let toast = document.getElementById('rider-toast-notif');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'rider-toast-notif';
      toast.className = 'rider-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.background = isSuccess ? '#059669' : '#ef4444';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Render Rider Overlay & Portal UI
  function initRiderPortalUI() {
    if (document.getElementById('rider-portal-overlay')) return;

    // Create Floating Pill
    const pill = document.createElement('button');
    pill.id = 'rider-quick-pill';
    pill.className = 'rider-quick-toggle-pill';
    pill.innerHTML = `
      <span class="pulse-dot"></span>
      <span>🛵 Rider Partner Portal</span>
    `;
    pill.title = 'Open FreshHub Rider Delivery Console';
    pill.onclick = () => openRiderPortal('orders');
    document.body.appendChild(pill);

    // Create Modal Overlay
    const overlay = document.createElement('div');
    overlay.id = 'rider-portal-overlay';
    overlay.innerHTML = `
      <div class="rider-app-window" id="rider-app-window">
        <header class="rider-top-nav">
          <div class="rider-brand">
            <div class="rider-brand-badge">🛵</div>
            <div>
              <div class="rider-brand-title">FreshHub Rider Partner</div>
              <div class="rider-brand-subtitle">Quick Commerce Delivery Fleet</div>
            </div>
          </div>
          <div class="rider-nav-actions">
            <button class="rider-close-btn" id="rider-close-btn" title="Back to Storefront">
              <span>✕</span> Close
            </button>
          </div>
        </header>

        <nav class="rider-sub-nav" id="rider-sub-nav">
          <!-- Dynamically populated based on auth status -->
        </nav>

        <main class="rider-body" id="rider-body">
          <!-- Main Content renders here -->
        </main>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event listener for close
    document.getElementById('rider-close-btn').addEventListener('click', closeRiderPortal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeRiderPortal();
    });

    // Listen to hash change for #rider
    window.addEventListener('hashchange', checkHashRoute);
    checkHashRoute();
  }

  function checkHashRoute() {
    const hash = window.location.hash || '';
    if (hash.startsWith('#rider')) {
      const parts = hash.split('/');
      const tab = parts[1] || 'orders';
      openRiderPortal(tab);
    }
  }

  function openRiderPortal(tab = 'orders') {
    const active = getActiveRider();
    if (!active && tab !== 'register') {
      currentTab = 'login';
    } else {
      currentTab = tab;
    }

    const overlay = document.getElementById('rider-portal-overlay');
    if (overlay) {
      overlay.classList.add('open');
      renderRiderPortal();
    }
  }

  function closeRiderPortal() {
    const overlay = document.getElementById('rider-portal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      if (window.location.hash.startsWith('#rider')) {
        history.replaceState(null, '', window.location.pathname + '#/');
      }
    }
  }

  // Renders the sub-nav tabs
  function renderSubNav() {
    const nav = document.getElementById('rider-sub-nav');
    const rider = getActiveRider();

    if (!rider) {
      nav.innerHTML = `
        <button class="rider-tab-btn ${currentTab === 'login' ? 'active' : ''}" id="tab-nav-login">
          🔑 Rider Login
        </button>
        <button class="rider-tab-btn ${currentTab === 'register' ? 'active' : ''}" id="tab-nav-register">
          📝 Register as Partner
        </button>
      `;

      document.getElementById('tab-nav-login')?.addEventListener('click', () => {
        currentTab = 'login';
        renderRiderPortal();
      });
      document.getElementById('tab-nav-register')?.addEventListener('click', () => {
        currentTab = 'register';
        renderRiderPortal();
      });
      return;
    }

    nav.innerHTML = `
      <button class="rider-tab-btn ${currentTab === 'orders' ? 'active' : ''}" id="tab-nav-orders">
        📦 Deliveries & Tasks
      </button>
      <button class="rider-tab-btn ${currentTab === 'earnings' ? 'active' : ''}" id="tab-nav-earnings">
        💰 Earnings & Payouts
      </button>
      <button class="rider-tab-btn ${currentTab === 'profile' ? 'active' : ''}" id="tab-nav-profile">
        👤 My Profile & Hub
      </button>
      <button class="rider-tab-btn" id="tab-nav-logout" style="margin-left:auto; color:#ef4444;">
        🚪 Logout
      </button>
    `;

    document.getElementById('tab-nav-orders')?.addEventListener('click', () => {
      currentTab = 'orders';
      renderRiderPortal();
    });
    document.getElementById('tab-nav-earnings')?.addEventListener('click', () => {
      currentTab = 'earnings';
      renderRiderPortal();
    });
    document.getElementById('tab-nav-profile')?.addEventListener('click', () => {
      currentTab = 'profile';
      renderRiderPortal();
    });
    document.getElementById('tab-nav-logout')?.addEventListener('click', () => {
      setActiveRider(null);
      currentTab = 'login';
      showRiderToast('Logged out successfully');
      renderRiderPortal();
    });
  }

  // Master Render Function
  function renderRiderPortal() {
    renderSubNav();
    const body = document.getElementById('rider-body');
    const rider = getActiveRider();

    if (!rider) {
      if (currentTab === 'register') {
        renderRegisterView(body);
      } else {
        renderLoginView(body);
      }
      return;
    }

    switch (currentTab) {
      case 'orders':
        renderOrdersView(body, rider);
        break;
      case 'earnings':
        renderEarningsView(body, rider);
        break;
      case 'profile':
        renderProfileView(body, rider);
        break;
      default:
        renderOrdersView(body, rider);
    }
  }

  // 1. RIDER LOGIN VIEW
  function renderLoginView(container) {
    const riders = getRiders();
    container.innerHTML = `
      <div class="rider-auth-card">
        <h2>Rider Partner Sign In</h2>
        <p class="desc">Log in to accept deliveries, view optimized delivery routes, and track your daily earnings.</p>

        <form id="rider-login-form">
          <div class="rider-form-group">
            <label for="rider-login-phone">Registered Mobile Number</label>
            <input type="tel" id="rider-login-phone" class="rider-input" placeholder="+91 98765 43210" value="+91 98765 43210" required />
          </div>
          <div class="rider-form-group">
            <label for="rider-login-pass">Password / Delivery PIN</label>
            <input type="password" id="rider-login-pass" class="rider-input" placeholder="••••••••" value="freshhub123" required />
          </div>
          <button type="submit" class="rider-btn-primary">
            🚀 Sign In & Go Online
          </button>
        </form>

        <div class="rider-demo-presets">
          <div class="rider-demo-title">⚡ Quick 1-Click Demo Riders:</div>
          <div class="rider-preset-chips">
            ${riders
              .map(
                (r) => `
              <button class="rider-preset-chip" data-rider-id="${r.id}">
                <span>🛵 ${r.name}</span>
                <span style="font-size:10px; opacity:0.7;">(${r.vehicleType})</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <div style="margin-top:20px; text-align:center; font-size:13px; color:#94a3b8;">
          Want to deliver with FreshHub? 
          <a href="javascript:void(0)" id="link-to-register" style="color:#10b981; font-weight:700; text-decoration:none;">
            Register as a Delivery Partner
          </a>
        </div>
      </div>
    `;

    document.getElementById('rider-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('rider-login-phone').value.trim();
      const rider = riders.find((r) => r.phone.replace(/\s/g, '').includes(phone.replace(/\s/g, ''))) || riders[0];
      setActiveRider(rider);
      setRiderOnline(true);
      currentTab = 'orders';
      showRiderToast(`Welcome back, ${rider.name}! You are now Online.`);
      renderRiderPortal();
    });

    container.querySelectorAll('.rider-preset-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-rider-id');
        const found = riders.find((r) => r.id === id);
        if (found) {
          setActiveRider(found);
          setRiderOnline(true);
          currentTab = 'orders';
          showRiderToast(`Logged in as ${found.name}`);
          renderRiderPortal();
        }
      });
    });

    document.getElementById('link-to-register')?.addEventListener('click', () => {
      currentTab = 'register';
      renderRiderPortal();
    });
  }

  // 2. RIDER REGISTRATION VIEW
  function renderRegisterView(container) {
    container.innerHTML = `
      <div class="rider-auth-card">
        <h2>Become a FreshHub Delivery Partner</h2>
        <p class="desc">Earn up to ₹35,000/month with flexible slots, instant daily payouts, and crate bonuses.</p>

        <form id="rider-register-form">
          <div class="rider-form-group">
            <label for="reg-name">Full Name</label>
            <input type="text" id="reg-name" class="rider-input" placeholder="e.g. Vikram Singh" required />
          </div>

          <div class="rider-form-group">
            <label for="reg-phone">Mobile Number</label>
            <input type="tel" id="reg-phone" class="rider-input" placeholder="+91 98990 12345" required />
          </div>

          <div class="rider-form-group">
            <label for="reg-hub">Preferred Warehouse / Hub</label>
            <select id="reg-hub" class="rider-select">
              <option value="WH-2 · Sector 57 Gurugram">WH-2 · Sector 57 Gurugram (Express Hub)</option>
              <option value="WH-1 · DLF Phase 3 Gurugram">WH-1 · DLF Phase 3 Gurugram (Central Hub)</option>
            </select>
          </div>

          <div class="rider-form-group">
            <label for="reg-vehicle">Vehicle Owned</label>
            <select id="reg-vehicle" class="rider-select">
              <option value="Electric Scooter (EV)">Electric Scooter / EV (Zero Emissions)</option>
              <option value="Motorcycle (Petrol)">Motorcycle / Bike (100-150cc)</option>
              <option value="Bicycle (Eco Delivery)">Bicycle / E-cycle (Short radius)</option>
              <option value="Delivery Van / Tempo">Delivery Van / Tempo (Bulk & B2B)</option>
            </select>
          </div>

          <div class="rider-form-group">
            <label for="reg-license">Driving License / ID Proof Number</label>
            <input type="text" id="reg-license" class="rider-input" placeholder="e.g. HR-26-2023-009988" required />
          </div>

          <div class="rider-form-group">
            <label for="reg-upi">UPI ID for Daily Instant Payouts</label>
            <input type="text" id="reg-upi" class="rider-input" placeholder="yourname@okhdfcbank" required />
          </div>

          <button type="submit" class="rider-btn-primary">
            ✅ Register & Start Delivering
          </button>
        </form>

        <div style="margin-top:20px; text-align:center; font-size:13px; color:#94a3b8;">
          Already registered? 
          <a href="javascript:void(0)" id="link-to-login" style="color:#10b981; font-weight:700; text-decoration:none;">
            Sign In here
          </a>
        </div>
      </div>
    `;

    document.getElementById('rider-register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const hub = document.getElementById('reg-hub').value;
      const vehicle = document.getElementById('reg-vehicle').value;
      const license = document.getElementById('reg-license').value.trim();
      const upi = document.getElementById('reg-upi').value.trim();

      const initials = name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'RP';

      const newRider = {
        id: 'rider-' + Date.now(),
        name,
        phone,
        vehicle,
        vehicleType: vehicle.split(' ')[0],
        hub,
        license,
        upi,
        rating: 5.0,
        joinedDate: 'Today',
        totalDeliveries: 0,
        todayDeliveries: 0,
        todayEarnings: 0,
        lifetimeEarnings: 0,
        balance: 100, // Joining bonus
        avatar: initials
      };

      const riders = getRiders();
      riders.unshift(newRider);
      saveRiders(riders);
      setActiveRider(newRider);
      setRiderOnline(true);
      currentTab = 'orders';
      showRiderToast(`Welcome to FreshHub, ${newRider.name}! ₹100 onboarding bonus added!`);
      renderRiderPortal();
    });

    document.getElementById('link-to-login')?.addEventListener('click', () => {
      currentTab = 'login';
      renderRiderPortal();
    });
  }

  // 3. RIDER DELIVERIES & WORKFLOW VIEW
  function renderOrdersView(container, rider) {
    const isOnline = isRiderOnline();

    // Get orders from central FreshHub storage
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('orders')) || [];
    } catch (e) {
      orders = [];
    }

    // Filter active orders
    // Orders that this rider is delivering or ready for pickup
    const myActiveOrders = orders.filter(
      (o) => o.riderId === rider.id && o.state !== 'DELIVERED' && o.state !== 'CANCELLED'
    );

    const availableOrders = orders.filter(
      (o) => (!o.riderId || o.riderId === '') && o.state !== 'DELIVERED' && o.state !== 'CANCELLED'
    );

    container.innerHTML = `
      <!-- Status & Duty Bar -->
      <div class="rider-status-bar">
        <div class="rider-profile-info">
          <div class="rider-avatar">${rider.avatar || 'RP'}</div>
          <div class="rider-name-group">
            <h3>${rider.name}</h3>
            <div class="rider-badge-row">
              <span class="vehicle-tag">🛵 ${rider.vehicleType || 'Motorcycle'}</span>
              <span>⭐ ${rider.rating || '4.9'}</span>
              <span>📍 ${rider.hub.split('·')[0].trim()}</span>
            </div>
          </div>
        </div>
        <div class="duty-switch">
          <button class="duty-switch-btn ${isOnline ? 'online' : 'offline'}" id="rider-duty-toggle">
            ${isOnline ? '🟢 Online (Accepting)' : '⚪ Offline'}
          </button>
        </div>
      </div>

      <!-- Quick KPI Stats -->
      <div class="rider-kpi-grid">
        <div class="rider-kpi-card">
          <div class="rider-kpi-label">Today's Earnings</div>
          <div class="rider-kpi-value">₹${rider.todayEarnings}</div>
          <div class="rider-kpi-sub">+₹${rider.balance} ready for cashout</div>
        </div>
        <div class="rider-kpi-card accent">
          <div class="rider-kpi-label">Today's Deliveries</div>
          <div class="rider-kpi-value">${rider.todayDeliveries} orders</div>
          <div class="rider-kpi-sub">${rider.totalDeliveries} total completed</div>
        </div>
        <div class="rider-kpi-card info">
          <div class="rider-kpi-label">On-Time Score</div>
          <div class="rider-kpi-value">98.8%</div>
          <div class="rider-kpi-sub">Avg 18 mins / delivery</div>
        </div>
      </div>

      <!-- My Active Trips Section -->
      <div class="rider-section-header">
        <h3>🚀 My Active Delivery Task (${myActiveOrders.length})</h3>
      </div>

      <div class="rider-orders-list" id="my-active-orders-list">
        ${
          myActiveOrders.length === 0
            ? `
          <div class="rider-empty-state">
            <div class="rider-empty-icon">📦</div>
            <p>No active delivery in progress right now.</p>
            <p style="font-size:12px;">Accept one of the available orders below to start earning!</p>
          </div>
        `
            : myActiveOrders.map((order) => renderActiveOrderCard(order, rider)).join('')
        }
      </div>

      <!-- Available Orders Pool -->
      <div class="rider-section-header" style="margin-top:28px;">
        <h3>📍 Orders Ready for Delivery at Hub (${availableOrders.length})</h3>
        <button class="duty-switch-btn" id="spawn-test-order-btn" style="background:#334155; font-size:12px; padding:6px 12px;">
          ➕ Generate New Delivery Order
        </button>
      </div>

      <div class="rider-orders-list" id="available-orders-list">
        ${
          !isOnline
            ? `
          <div class="rider-empty-state">
            <div class="rider-empty-icon">⏸️</div>
            <p>You are currently <strong>Offline</strong>.</p>
            <p style="font-size:12px;">Toggle Online above to see and accept live delivery requests.</p>
          </div>
        `
            : availableOrders.length === 0
            ? `
          <div class="rider-empty-state">
            <div class="rider-empty-icon">✅</div>
            <p>All warehouse orders are currently picked up!</p>
            <p style="font-size:12px;">Click "Generate New Delivery Order" above to simulate a new customer order ready at the warehouse.</p>
          </div>
        `
            : availableOrders.map((order) => renderAvailableOrderCard(order)).join('')
        }
      </div>
    `;

    // Duty Switch Event
    document.getElementById('rider-duty-toggle')?.addEventListener('click', () => {
      const next = !isRiderOnline();
      setRiderOnline(next);
      showRiderToast(next ? 'You are now Online and accepting deliveries!' : 'You are now Offline.');
      renderRiderPortal();
    });

    // Spawn Order Event
    document.getElementById('spawn-test-order-btn')?.addEventListener('click', () => {
      spawnDemoOrder(rider.hub.split('·')[0].trim());
      showRiderToast('New fresh delivery order created at warehouse!');
      renderRiderPortal();
    });

    // Bind Order Action Buttons
    bindOrderActions(container, rider);
  }

  function renderActiveOrderCard(order, rider) {
    const isOutForDelivery = order.state === 'OUT_FOR_DELIVERY';
    const isPicking = order.state === 'PICKING' || order.state === 'NEW';
    const crates = order.crates || (order.lines ? Math.max(1, Math.ceil(order.lines.length / 2)) : 1);
    const estEarnings = 55 + (crates > 1 ? (crates - 1) * 15 : 0) + 20 + 35; // Base + Crate + Slot + Tip

    return `
      <div class="rider-order-card active-order">
        <div class="order-top">
          <div class="order-id-badge">
            <span>${order.id}</span>
            <span class="order-channel-tag">${order.slot || 'Express 90 min'}</span>
          </div>
          <div class="order-payout-estimate">
            <div class="payout-amount">₹${estEarnings}</div>
            <div class="payout-tag">Earnings on Delivery</div>
          </div>
        </div>

        <div class="order-waypoints">
          <div class="waypoint pickup">
            <div class="waypoint-type">Step 1: Pick Up · ${order.wh || 'WH-2'} Warehouse</div>
            <div class="waypoint-name">${order.wh === 'WH-1' ? 'DLF Phase 3 Dark Store' : 'Sector 57 Gurugram Dark Store'}</div>
            <div class="waypoint-meta">${crates} Chilled Freshness Crate(s) tagged</div>
          </div>
          <div class="waypoint drop">
            <div class="waypoint-type">Step 2: Drop · Customer Handover</div>
            <div class="waypoint-name">${order.customer || 'Customer'}</div>
            <div class="waypoint-meta">${order.addr || 'Sector 43, Gurugram'}</div>
          </div>
        </div>

        <div class="order-items-preview">
          <span>🛒 <strong>Items:</strong></span>
          ${(order.lines || [])
            .map((line) => `<span>• ${line.name} (${line.pack || '1 unit'})</span>`)
            .slice(0, 4)
            .join(' ')}
          ${(order.lines || []).length > 4 ? `<span>+${order.lines.length - 4} more</span>` : ''}
        </div>

        <div class="order-actions">
          ${
            isPicking
              ? `
            <button class="btn-delivery-action btn-pickup" data-action="pickup" data-order-id="${order.id}">
              🏭 Confirm Crate Pickup from Warehouse
            </button>
          `
              : `
            <button class="btn-delivery-action btn-navigate" data-action="navigate" data-order-id="${order.id}">
              🗺️ Open GPS Map (${order.addr ? order.addr.split('·')[0] : 'Gurugram'})
            </button>
            <button class="btn-delivery-action btn-complete" data-action="complete" data-order-id="${order.id}">
              ✅ Verify & Complete Delivery (Collect ₹${estEarnings})
            </button>
          `
          }
        </div>
      </div>
    `;
  }

  function renderAvailableOrderCard(order) {
    const crates = order.crates || (order.lines ? Math.max(1, Math.ceil(order.lines.length / 2)) : 1);
    const estEarnings = 55 + (crates > 1 ? (crates - 1) * 15 : 0) + 20 + 30;

    return `
      <div class="rider-order-card">
        <div class="order-top">
          <div class="order-id-badge">
            <span>${order.id}</span>
            <span class="order-channel-tag">${order.channel || 'D2C'}</span>
          </div>
          <div class="order-payout-estimate">
            <div class="payout-amount">₹${estEarnings}</div>
            <div class="payout-tag">Estimated Payout</div>
          </div>
        </div>

        <div class="order-waypoints">
          <div class="waypoint pickup">
            <div class="waypoint-type">Pick up from ${order.wh || 'WH-2'}</div>
            <div class="waypoint-name">${order.wh === 'WH-1' ? 'Central Hub · DLF Phase 3' : 'Sector 57 Express Dark Store'}</div>
          </div>
          <div class="waypoint drop">
            <div class="waypoint-type">Deliver to</div>
            <div class="waypoint-name">${order.customer || 'Customer'} · ${order.addr || 'Gurugram'}</div>
            <div class="waypoint-meta">Slot: ${order.slot || 'Express'} · Crates: ${crates}</div>
          </div>
        </div>

        <div class="order-actions">
          <button class="btn-delivery-action btn-accept" data-action="accept" data-order-id="${order.id}">
            🛵 Accept Delivery Order (Earn ₹${estEarnings})
          </button>
        </div>
      </div>
    `;
  }

  function bindOrderActions(container, rider) {
    container.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const orderId = btn.getAttribute('data-order-id');
        handleOrderWorkflow(action, orderId, rider);
      });
    });
  }

  // Handles Order State Transitions
  function handleOrderWorkflow(action, orderId, rider) {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('orders')) || [];
    } catch (e) {
      orders = [];
    }

    const orderIdx = orders.findIndex((o) => o.id === orderId);
    if (orderIdx === -1) return;

    const order = orders[orderIdx];

    if (action === 'accept') {
      order.riderId = rider.id;
      order.riderName = rider.name;
      order.state = 'PICKING';
      order.events = order.events || [];
      order.events.push({
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        msg: `Accepted by rider ${rider.name} (${rider.vehicleType})`
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      showRiderToast(`Order ${orderId} assigned to you! Proceed to warehouse for pickup.`);
      renderRiderPortal();
    } else if (action === 'pickup') {
      order.state = 'OUT_FOR_DELIVERY';
      order.events = order.events || [];
      order.events.push({
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        msg: `Crates picked up from ${order.wh || 'WH-2'} warehouse. Out for delivery.`
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      // Also ensure it syncs with trips
      syncWithTrips(order, rider);

      showRiderToast(`Crates verified! Order ${orderId} is now OUT FOR DELIVERY.`);
      renderRiderPortal();
    } else if (action === 'navigate') {
      const addressQuery = encodeURIComponent(order.addr || 'Sector 43, Gurugram');
      window.open(`https://www.google.com/maps/search/?api=1&query=${addressQuery}`, '_blank');
    } else if (action === 'complete') {
      // Calculate earnings
      const crates = order.crates || (order.lines ? Math.max(1, Math.ceil(order.lines.length / 2)) : 1);
      const basePay = 55;
      const crateBonus = crates > 1 ? (crates - 1) * 15 : 0;
      const slotBonus = 20;
      const tip = 35;
      const totalEarned = basePay + crateBonus + slotBonus + tip;

      // Mark order delivered
      order.state = 'DELIVERED';
      order.events = order.events || [];
      order.events.push({
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        msg: `Delivered safely to customer by ${rider.name}.`
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      // Update Rider metrics
      rider.todayDeliveries += 1;
      rider.totalDeliveries += 1;
      rider.todayEarnings += totalEarned;
      rider.lifetimeEarnings += totalEarned;
      rider.balance += totalEarned;
      setActiveRider(rider);

      // Update in riders list
      const riders = getRiders();
      const rIdx = riders.findIndex((r) => r.id === rider.id);
      if (rIdx !== -1) {
        riders[rIdx] = rider;
        saveRiders(riders);
      }

      // Add to Ledger
      addRiderLedgerEntry(rider.id, {
        orderId: order.id,
        customer: order.customer || 'Customer',
        address: order.addr || 'Gurugram',
        slot: order.slot || 'Express',
        crates,
        basePay,
        crateBonus,
        slotBonus,
        tip,
        total: totalEarned,
        status: 'PAID',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: 'Today'
      });

      showRiderToast(`🎉 Delivery completed! ₹${totalEarned} credited to your balance.`);
      renderRiderPortal();
    }
  }

  function syncWithTrips(order, rider) {
    try {
      let trips = JSON.parse(localStorage.getItem('trips')) || [];
      const exists = trips.some((t) => t.orderId === order.id);
      if (!exists) {
        trips.unshift({
          orderId: order.id,
          customer: order.customer || 'Customer',
          addr: order.addr || 'Sector 43 Gurugram',
          channel: order.channel || 'D2C',
          wh: order.wh || 'WH-2',
          rider: rider.name,
          crates: order.crates || 1,
          t: 0.1,
          status: 'MOVING',
          startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        localStorage.setItem('trips', JSON.stringify(trips));
      }
    } catch (e) {
      // trips sync fallback
    }
  }

  function spawnDemoOrder(wh = 'WH-2') {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('orders')) || [];
    } catch (e) {
      orders = [];
    }

    const seq = Math.floor(88240 + Math.random() * 800);
    const customers = [
      { name: 'Kavita Chawla', addr: 'Flat 402, Nirvana Country · Sector 50, Gurugram' },
      { name: 'Devendra Rao', addr: 'Villa 18, Palm Springs · Golf Course Road, Gurugram' },
      { name: 'Meenakshi Sundaram', addr: 'A-204, Hamilton Court · DLF Phase 4, Gurugram' },
      { name: 'Sanjay Malhotra', addr: 'C-12, South City 1 · Gurugram' }
    ];
    const pick = customers[Math.floor(Math.random() * customers.length)];

    const newOrder = {
      id: `FH-${seq}`,
      customer: pick.name,
      addr: pick.addr,
      phone: '+91 98••• ••' + Math.floor(100 + Math.random() * 899),
      channel: 'D2C',
      wh: wh || 'WH-2',
      slot: 'Express 90 min',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payMode: 'UPI',
      charges: { packaging: 9, delivery: 0, slotFee: 19 },
      state: 'NEW',
      crates: Math.floor(1 + Math.random() * 2),
      lines: [
        { productId: 'tomato-hybrid', name: 'Tomato Hybrid', pack: '1 kg', qty: 2, price: 41 },
        { productId: 'spinach', name: 'Spinach Bunch', pack: '2 bunches', qty: 1, price: 36 },
        { productId: 'mango-alphonso', name: 'Alphonso Mango', pack: '3 pc', qty: 1, price: 246 }
      ],
      events: [
        {
          at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          msg: 'Order placed by customer · Dark store allocated'
        }
      ]
    };

    orders.unshift(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  // 4. RIDER EARNINGS & PAYOUTS VIEW
  function renderEarningsView(container, rider) {
    const ledger = getRiderLedger(rider.id);

    container.innerHTML = `
      <!-- Cashout Card -->
      <div class="cashout-box">
        <div class="cashout-info">
          <h4>Withdrawable Wallet Balance: ₹${rider.balance}</h4>
          <p>Linked UPI ID: <strong>${rider.upi || 'yourname@upi'}</strong> · Instant settlement 24/7</p>
        </div>
        <button class="btn-cashout" id="btn-cashout-action" ${rider.balance <= 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          💸 Instant Cashout to Bank / UPI
        </button>
      </div>

      <!-- KPI Summary -->
      <div class="rider-kpi-grid">
        <div class="rider-kpi-card">
          <div class="rider-kpi-label">Today's Earnings</div>
          <div class="rider-kpi-value">₹${rider.todayEarnings}</div>
          <div class="rider-kpi-sub">${rider.todayDeliveries} trips completed today</div>
        </div>
        <div class="rider-kpi-card accent">
          <div class="rider-kpi-label">Total Lifetime Earnings</div>
          <div class="rider-kpi-value">₹${rider.lifetimeEarnings.toLocaleString()}</div>
          <div class="rider-kpi-sub">${rider.totalDeliveries} all-time deliveries</div>
        </div>
        <div class="rider-kpi-card info">
          <div class="rider-kpi-label">Average Per Order</div>
          <div class="rider-kpi-value">₹${rider.totalDeliveries ? Math.round(rider.lifetimeEarnings / rider.totalDeliveries) : 85}</div>
          <div class="rider-kpi-sub">Includes crate bonus & tips</div>
        </div>
      </div>

      <!-- Rate Card Breakdown -->
      <div class="rider-section-header" style="margin-top:20px;">
        <h3>📋 FreshHub Rider Payout Structure</h3>
      </div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; margin-bottom:24px;">
        <div style="background:rgba(30,41,59,0.5); padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Base Pay</div>
          <div style="font-size:16px; font-weight:800; color:#ffffff; margin:4px 0;">₹55 / trip</div>
          <div style="font-size:11px; color:#64748b;">Guaranteed minimum per completed order</div>
        </div>
        <div style="background:rgba(30,41,59,0.5); padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Crate / Weight Bonus</div>
          <div style="font-size:16px; font-weight:800; color:#ffffff; margin:4px 0;">+₹15 / extra crate</div>
          <div style="font-size:11px; color:#64748b;">For heavy produce & multi-bag orders</div>
        </div>
        <div style="background:rgba(30,41,59,0.5); padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Express Slot Incentive</div>
          <div style="font-size:16px; font-weight:800; color:#ffffff; margin:4px 0;">+₹20 / order</div>
          <div style="font-size:11px; color:#64748b;">For under 90-min fast deliveries</div>
        </div>
        <div style="background:rgba(30,41,59,0.5); padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Customer Tips</div>
          <div style="font-size:16px; font-weight:800; color:#10b981; margin:4px 0;">100% Passed On</div>
          <div style="font-size:11px; color:#64748b;">Zero deductions on customer tips</div>
        </div>
      </div>

      <!-- Payout Ledger Table -->
      <div class="rider-section-header">
        <h3>📜 Delivery & Earnings Ledger (${ledger.length} trips recorded)</h3>
      </div>

      <div class="rider-ledger-table-wrap">
        <table class="rider-ledger-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer & Area</th>
              <th>Crates</th>
              <th>Base + Bonuses</th>
              <th>Tip</th>
              <th>Total Earned</th>
              <th>Payout Status</th>
            </tr>
          </thead>
          <tbody>
            ${ledger
              .map(
                (item) => `
              <tr>
                <td><strong style="color:#10b981;">${item.orderId}</strong><br><span style="font-size:11px; color:#64748b;">${item.date} ${item.time}</span></td>
                <td><strong>${item.customer}</strong><br><span style="font-size:11px; color:#94a3b8;">${item.address}</span></td>
                <td>${item.crates || 1} crate(s)</td>
                <td>₹${item.basePay} + ₹${(item.crateBonus || 0) + (item.slotBonus || 0)}</td>
                <td style="color:#10b981;">+₹${item.tip || 0}</td>
                <td><strong style="font-size:15px; color:#f59e0b;">₹${item.total}</strong></td>
                <td><span class="status-badge-paid">✓ Paid / Credited</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-cashout-action')?.addEventListener('click', () => {
      if (rider.balance <= 0) return;
      const cashedOut = rider.balance;
      rider.balance = 0;
      setActiveRider(rider);

      const riders = getRiders();
      const rIdx = riders.findIndex((r) => r.id === rider.id);
      if (rIdx !== -1) {
        riders[rIdx] = rider;
        saveRiders(riders);
      }

      showRiderToast(`💸 ₹${cashedOut} sent instantly to ${rider.upi}! Reference: TXN-${Math.floor(100000 + Math.random() * 900000)}`);
      renderRiderPortal();
    });
  }

  // 5. RIDER PROFILE VIEW
  function renderProfileView(container, rider) {
    container.innerHTML = `
      <div class="rider-auth-card" style="max-width:600px;">
        <h2>Rider Partner Profile</h2>
        <p class="desc">Manage your vehicle details, verification status, and assigned FreshHub dark store.</p>

        <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px; padding-bottom:18px; border-bottom:1px solid rgba(255,255,255,0.08);">
          <div class="rider-avatar" style="width:64px; height:64px; font-size:24px;">${rider.avatar || 'RP'}</div>
          <div>
            <h3 style="margin:0 0 6px 0; font-size:18px; color:#ffffff;">${rider.name}</h3>
            <div style="font-size:13px; color:#10b981; font-weight:700;">✅ Verified Delivery Partner</div>
            <div style="font-size:12px; color:#94a3b8;">Delivering since ${rider.joinedDate || 'Jan 2026'}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
          <div>
            <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Phone Number</div>
            <div style="font-size:14px; font-weight:600; color:#ffffff; margin-top:2px;">${rider.phone}</div>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Partner Rating</div>
            <div style="font-size:14px; font-weight:600; color:#f59e0b; margin-top:2px;">⭐ ${rider.rating} / 5.0</div>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Assigned Warehouse</div>
            <div style="font-size:14px; font-weight:600; color:#ffffff; margin-top:2px;">${rider.hub}</div>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Vehicle Owned</div>
            <div style="font-size:14px; font-weight:600; color:#ffffff; margin-top:2px;">${rider.vehicle}</div>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Driving License / ID</div>
            <div style="font-size:14px; font-weight:600; color:#ffffff; margin-top:2px;">${rider.license}</div>
          </div>
          <div>
            <div style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase;">Payout UPI ID</div>
            <div style="font-size:14px; font-weight:600; color:#ffffff; margin-top:2px;">${rider.upi}</div>
          </div>
        </div>

        <button class="rider-btn-primary" id="btn-back-to-deliveries">
          📦 Back to Deliveries Console
        </button>
      </div>
    `;

    document.getElementById('btn-back-to-deliveries')?.addEventListener('click', () => {
      currentTab = 'orders';
      renderRiderPortal();
    });
  }

  // Expose global methods if needed
  window.FreshHubRider = {
    open: openRiderPortal,
    close: closeRiderPortal,
    getRiders,
    getActiveRider
  };

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRiderPortalUI);
  } else {
    initRiderPortalUI();
  }
})();
