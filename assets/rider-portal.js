/**
 * FreshHub Multi-Panel System
 * Dedicated Panels:
 * 1. 🛍️ Customer Storefront (#/)
 * 2. 🛵 Rider Partner App (#/rider)
 * 3. 👑 Admin Ops Console (#/ops)
 * 4. 🏭 Staff Picker Station (#/ops/picker)
 */

(function () {
  'use strict';

  const STORAGE_KEY_RIDERS = 'freshhub_riders';
  const STORAGE_KEY_ACTIVE_RIDER = 'freshhub_active_rider';
  const STORAGE_KEY_DUTY = 'freshhub_rider_duty';
  const STORAGE_KEY_LEDGER = 'freshhub_rider_ledger_';

  // 5 Registered Riders in the Fleet
  const DEFAULT_RIDERS = [
    {
      id: 'rider-sahil',
      name: 'Sahil Kumar',
      phone: '+91 98765 43210',
      vehicle: 'Ather 450X (Electric Scooter)',
      vehicleType: 'EV Scooter',
      hub: 'WH-2 · Sector 57 Gurugram',
      license: 'HR-26-2021-008912',
      upi: 'sahil.kumar@okhdfcbank',
      status: 'AVAILABLE', // 'AVAILABLE' | 'ON_DELIVERY' | 'OFFLINE'
      currentTrip: null,
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
      status: 'ON_DELIVERY',
      currentTrip: 'FH-88214 · DLF Phase 3',
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
      status: 'AVAILABLE',
      currentTrip: null,
      rating: 4.96,
      joinedDate: 'Feb 2026',
      totalDeliveries: 230,
      todayDeliveries: 5,
      todayEarnings: 420,
      lifetimeEarnings: 18100,
      balance: 840,
      avatar: 'MV'
    },
    {
      id: 'rider-vikram',
      name: 'Vikram Singh',
      phone: '+91 98990 77889',
      vehicle: 'TVS iQube EV',
      vehicleType: 'EV Scooter',
      hub: 'WH-1 · DLF Phase 3 Gurugram',
      license: 'HR-26-2023-004122',
      upi: 'vikram.singh@okaxis',
      status: 'AVAILABLE',
      currentTrip: null,
      rating: 4.91,
      joinedDate: 'Dec 2025',
      totalDeliveries: 340,
      todayDeliveries: 7,
      todayEarnings: 590,
      lifetimeEarnings: 27800,
      balance: 1190,
      avatar: 'VS'
    },
    {
      id: 'rider-aman',
      name: 'Aman Gupta',
      phone: '+91 98101 22990',
      vehicle: 'Bajaj Pulsar 150',
      vehicleType: 'Motorcycle',
      hub: 'WH-2 · Sector 57 Gurugram',
      license: 'HR-55-2021-007788',
      upi: 'aman.gupta@paytm',
      status: 'ON_DELIVERY',
      currentTrip: 'FH-88226 · Sector 57',
      rating: 4.89,
      joinedDate: 'Jan 2026',
      totalDeliveries: 385,
      todayDeliveries: 9,
      todayEarnings: 740,
      lifetimeEarnings: 31200,
      balance: 1620,
      avatar: 'AG'
    }
  ];

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
    }
  ];

  // Helper State
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

  let currentRiderTab = 'deliveries'; // 'deliveries' | 'earnings' | 'login' | 'register'

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

  // 1. TOP GLOBAL PANEL SWITCHER BAR
  function injectTopPanelBar() {
    if (document.getElementById('freshhub-global-panel-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'freshhub-global-panel-bar';
    bar.className = 'freshhub-global-panel-bar';
    bar.innerHTML = `
      <div class="panel-bar-inner">
        <div class="panel-bar-brand">
          <span class="panel-brand-icon">🌱</span>
          <span class="panel-brand-name">FreshHub Panels:</span>
        </div>

        <div class="panel-bar-links">
          <a href="#/" class="panel-nav-btn" data-panel="customer">
            <span>🛍️ Customer Store</span>
          </a>
          <a href="#/rider" class="panel-nav-btn" data-panel="rider">
            <span>🛵 Rider Partner App</span>
          </a>
          <a href="#/ops" class="panel-nav-btn" data-panel="admin">
            <span>👑 Admin Ops Console</span>
          </a>
          <a href="#/ops/picker" class="panel-nav-btn" data-panel="staff">
            <span>🏭 Staff Picker App</span>
          </a>
        </div>
      </div>
    `;

    document.body.prepend(bar);
    updateActivePanelButton();
    window.addEventListener('hashchange', updateActivePanelButton);
  }

  function updateActivePanelButton() {
    const hash = window.location.hash || '#/';
    const buttons = document.querySelectorAll('.panel-nav-btn');

    buttons.forEach((btn) => {
      btn.classList.remove('active');
      const panel = btn.getAttribute('data-panel');
      if (panel === 'rider' && hash.startsWith('#/rider')) {
        btn.classList.add('active');
      } else if (panel === 'admin' && (hash === '#/ops' || hash.startsWith('#/ops/fleet') || hash.startsWith('#/ops/catalogue') || hash.startsWith('#/ops/inventory') || hash.startsWith('#/ops/access'))) {
        btn.classList.add('active');
      } else if (panel === 'staff' && hash.startsWith('#/ops/picker')) {
        btn.classList.add('active');
      } else if (panel === 'customer' && (hash === '#/' || hash.startsWith('#/track') || hash.startsWith('#/c/'))) {
        btn.classList.add('active');
      }
    });

    // If on #/rider route, open the full Rider screen automatically
    if (hash.startsWith('#/rider')) {
      openRiderScreen();
    } else {
      closeRiderScreen();
    }

    // Check if on Admin fleet map
    if (hash.startsWith('#/ops/fleet') || hash === '#/ops') {
      setTimeout(injectAdminFleetManagement, 600);
    }
  }

  // 2. RIDER FULL SCREEN APP
  function createRiderAppUI() {
    if (document.getElementById('rider-fullscreen-container')) return;

    // Floating Quick Button
    const pill = document.createElement('button');
    pill.id = 'rider-quick-pill';
    pill.className = 'rider-quick-toggle-pill';
    pill.innerHTML = `
      <span class="pulse-dot"></span>
      <span>🛵 Rider Partner Portal</span>
    `;
    pill.title = 'Open Dedicated Rider Delivery App';
    pill.onclick = () => {
      window.location.hash = '#/rider';
    };
    document.body.appendChild(pill);

    // Fullscreen / Dedicated Container
    const container = document.createElement('div');
    container.id = 'rider-fullscreen-container';
    container.className = 'rider-fullscreen-container';
    container.innerHTML = `
      <div class="rider-app-window" id="rider-app-window">
        <header class="rider-top-nav">
          <div class="rider-brand">
            <div class="rider-brand-badge">🛵</div>
            <div>
              <div class="rider-brand-title">FreshHub Delivery Partner App</div>
              <div class="rider-brand-subtitle">Quick Commerce Rider Console</div>
            </div>
          </div>
          <div class="rider-nav-actions">
            <a href="#/ops" class="rider-close-btn" title="Open Admin Ops Console">
              <span>👑</span> Admin Console
            </a>
            <a href="#/" class="rider-close-btn" title="Back to Customer Store">
              <span>🛍️</span> Customer Store
            </a>
          </div>
        </header>

        <nav class="rider-sub-nav" id="rider-sub-nav"></nav>

        <main class="rider-body" id="rider-body"></main>
      </div>
    `;

    document.body.appendChild(container);
  }

  function openRiderScreen() {
    const container = document.getElementById('rider-fullscreen-container');
    if (container) {
      container.classList.add('open');
      renderRiderContent();
    }
  }

  function closeRiderScreen() {
    const container = document.getElementById('rider-fullscreen-container');
    if (container) {
      container.classList.remove('open');
    }
  }

  function renderRiderNav() {
    const nav = document.getElementById('rider-sub-nav');
    const rider = getActiveRider();

    if (!rider) {
      nav.innerHTML = `
        <button class="rider-tab-btn ${currentRiderTab === 'login' ? 'active' : ''}" id="btn-rider-tab-login">
          🔑 Partner Login
        </button>
        <button class="rider-tab-btn ${currentRiderTab === 'register' ? 'active' : ''}" id="btn-rider-tab-reg">
          📝 Register as Partner
        </button>
      `;

      document.getElementById('btn-rider-tab-login')?.addEventListener('click', () => {
        currentRiderTab = 'login';
        renderRiderContent();
      });
      document.getElementById('btn-rider-tab-reg')?.addEventListener('click', () => {
        currentRiderTab = 'register';
        renderRiderContent();
      });
      return;
    }

    nav.innerHTML = `
      <button class="rider-tab-btn ${currentRiderTab === 'deliveries' ? 'active' : ''}" id="btn-rider-tab-deliv">
        📦 Deliveries & Live Tasks
      </button>
      <button class="rider-tab-btn ${currentRiderTab === 'earnings' ? 'active' : ''}" id="btn-rider-tab-earn">
        💰 Earnings & Instant Payout
      </button>
      <button class="rider-tab-btn" id="btn-rider-tab-logout" style="margin-left:auto; color:#ef4444;">
        🚪 Logout / Switch Rider
      </button>
    `;

    document.getElementById('btn-rider-tab-deliv')?.addEventListener('click', () => {
      currentRiderTab = 'deliveries';
      renderRiderContent();
    });
    document.getElementById('btn-rider-tab-earn')?.addEventListener('click', () => {
      currentRiderTab = 'earnings';
      renderRiderContent();
    });
    document.getElementById('btn-rider-tab-logout')?.addEventListener('click', () => {
      setActiveRider(null);
      currentRiderTab = 'login';
      showRiderToast('Logged out of Rider App');
      renderRiderContent();
    });
  }

  function renderRiderContent() {
    renderRiderNav();
    const body = document.getElementById('rider-body');
    const rider = getActiveRider();

    if (!rider) {
      if (currentRiderTab === 'register') {
        renderRiderRegister(body);
      } else {
        renderRiderLogin(body);
      }
      return;
    }

    if (currentRiderTab === 'earnings') {
      renderRiderEarnings(body, rider);
    } else {
      renderRiderDeliveries(body, rider);
    }
  }

  // RIDER LOGIN
  function renderRiderLogin(container) {
    const riders = getRiders();
    container.innerHTML = `
      <div class="rider-auth-card">
        <h2>Rider Partner Sign In</h2>
        <p class="desc">Select your profile to view incoming delivery orders and live GPS routes.</p>

        <div style="margin-bottom: 20px;">
          <div class="rider-demo-title">⚡ Select Delivery Partner Profile:</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${riders
              .map(
                (r) => `
              <button class="rider-select-card" data-id="${r.id}">
                <div style="text-align:left;">
                  <div style="font-weight:800; font-size:14px; color:#ffffff;">🛵 ${r.name}</div>
                  <div style="font-size:11px; color:#94a3b8;">${r.vehicle} · ${r.hub.split('·')[0]}</div>
                </div>
                <span class="rider-badge-select">Login →</span>
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <div style="text-align:center; font-size:13px; color:#94a3b8; margin-top:16px;">
          New delivery partner?{' '}
          <a href="javascript:void(0)" id="link-rider-reg" style="color:#10b981; font-weight:700; text-decoration:none;">
            Register Here
          </a>
        </div>
      </div>
    `;

    container.querySelectorAll('.rider-select-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const found = riders.find((r) => r.id === id);
        if (found) {
          setActiveRider(found);
          setRiderOnline(true);
          currentRiderTab = 'deliveries';
          showRiderToast(`Welcome back, ${found.name}! You are Online.`);
          renderRiderContent();
        }
      });
    });

    document.getElementById('link-rider-reg')?.addEventListener('click', () => {
      currentRiderTab = 'register';
      renderRiderContent();
    });
  }

  // RIDER REGISTRATION
  function renderRiderRegister(container) {
    container.innerHTML = `
      <div class="rider-auth-card">
        <h2>Rider Onboarding</h2>
        <p class="desc">Register as an authorized delivery partner and get ₹100 joining bonus.</p>

        <form id="rider-form-reg">
          <div class="rider-form-group">
            <label>Full Name</label>
            <input type="text" id="reg-r-name" class="rider-input" placeholder="e.g. Deepak Sharma" required />
          </div>
          <div class="rider-form-group">
            <label>Mobile Number</label>
            <input type="tel" id="reg-r-phone" class="rider-input" placeholder="+91 98123 45678" required />
          </div>
          <div class="rider-form-group">
            <label>Vehicle Type</label>
            <select id="reg-r-veh" class="rider-select">
              <option value="Ather 450X (EV Scooter)">Electric Scooter / EV (Zero Emissions)</option>
              <option value="Honda Shine (Motorcycle)">Motorcycle / Bike (125cc)</option>
              <option value="Eco Cargo Bicycle">Bicycle (Eco Delivery)</option>
            </select>
          </div>
          <div class="rider-form-group">
            <label>Preferred Warehouse / Dark Store Hub</label>
            <select id="reg-r-hub" class="rider-select">
              <option value="WH-2 · Sector 57 Gurugram">WH-2 · Sector 57 Gurugram</option>
              <option value="WH-1 · DLF Phase 3 Gurugram">WH-1 · DLF Phase 3 Gurugram</option>
            </select>
          </div>
          <div class="rider-form-group">
            <label>Driving License / ID Proof Number</label>
            <input type="text" id="reg-r-lic" class="rider-input" placeholder="HR-26-2023-009988" required />
          </div>
          <div class="rider-form-group">
            <label>UPI ID for Instant Daily Payouts</label>
            <input type="text" id="reg-r-upi" class="rider-input" placeholder="yourname@okhdfcbank" required />
          </div>

          <button type="submit" class="rider-btn-primary">
            ✅ Complete Registration & Start Delivering
          </button>
        </form>
      </div>
    `;

    document.getElementById('rider-form-reg').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-r-name').value.trim();
      const phone = document.getElementById('reg-r-phone').value.trim();
      const veh = document.getElementById('reg-r-veh').value;
      const hub = document.getElementById('reg-r-hub').value;
      const lic = document.getElementById('reg-r-lic').value.trim();
      const upi = document.getElementById('reg-r-upi').value.trim();

      const newRider = {
        id: `rider-${Date.now()}`,
        name,
        phone,
        vehicle: veh,
        vehicleType: veh.split(' ')[0],
        hub,
        license: lic,
        upi,
        status: 'AVAILABLE',
        currentTrip: null,
        rating: 5.0,
        joinedDate: 'Today',
        totalDeliveries: 0,
        todayDeliveries: 0,
        todayEarnings: 0,
        lifetimeEarnings: 0,
        balance: 100,
        avatar: name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
      };

      const riders = getRiders();
      riders.unshift(newRider);
      saveRiders(riders);
      setActiveRider(newRider);
      setRiderOnline(true);
      currentRiderTab = 'deliveries';
      showRiderToast(`Welcome ${name}! ₹100 joining bonus credited.`);
      renderRiderContent();
    });
  }

  // RIDER DELIVERIES & WORKFLOW
  function renderRiderDeliveries(container, rider) {
    const isOnline = isRiderOnline();

    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem('orders')) || [];
    } catch (e) {
      orders = [];
    }

    // Active order being handled by this rider
    const activeOrder = orders.find(
      (o) => o.riderId === rider.id && o.state !== 'DELIVERED' && o.state !== 'CANCELLED'
    );

    // Available orders ready at warehouse
    const availableOrders = orders.filter(
      (o) => (!o.riderId || o.riderId === '') && o.state !== 'DELIVERED' && o.state !== 'CANCELLED'
    );

    container.innerHTML = `
      <!-- Duty & Status Bar -->
      <div class="rider-status-bar">
        <div class="rider-profile-info">
          <div class="rider-avatar">${rider.avatar || 'SK'}</div>
          <div class="rider-name-group">
            <h3>${rider.name}</h3>
            <div class="rider-badge-row">
              <span class="vehicle-tag">🛵 ${rider.vehicle}</span>
              <span>⭐ ${rider.rating}</span>
              <span>📍 ${rider.hub.split('·')[0].trim()}</span>
            </div>
          </div>
        </div>

        <div class="duty-switch">
          <button class="duty-switch-btn ${isOnline ? 'online' : 'offline'}" id="btn-rider-duty-switch">
            ${isOnline ? '🟢 Online (Accepting Orders)' : '⚪ Offline'}
          </button>
        </div>
      </div>

      <!-- Live Incoming / Active Order Notification ("Ye Order Aaya Hai, Yaha Jana Hai") -->
      ${
        activeOrder
          ? renderActiveOrderCard(activeOrder, rider)
          : availableOrders.length > 0 && isOnline
          ? renderIncomingAlertCard(availableOrders[0], rider)
          : `
          <div class="rider-empty-state">
            <div class="rider-empty-icon">🛵</div>
            <h4 style="color:#ffffff; font-size:16px;">Waiting for new delivery orders...</h4>
            <p style="font-size:13px; margin-top:4px;">
              ${
                !isOnline
                  ? 'You are currently Offline. Turn Online above to start receiving order alerts.'
                  : 'You are Online and active in the Gurugram cluster. New customer orders from WH-1 & WH-2 will alert you instantly.'
              }
            </p>
            <button class="rider-btn-primary" id="btn-spawn-order-demo" style="max-width:260px; margin:16px auto 0; font-size:12px; padding:10px;">
              ➕ Dispatch Demo Customer Order
            </button>
          </div>
        `
      }

      <!-- Available Orders Pool -->
      ${
        isOnline && availableOrders.length > 1
          ? `
        <div style="margin-top:24px;">
          <h4 style="font-size:15px; font-weight:800; color:#ffffff; margin-bottom:12px;">
            Other Ready Orders at Dark Store (${availableOrders.length - 1})
          </h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${availableOrders
              .slice(1)
              .map(
                (o) => `
              <div class="rider-order-card" style="padding:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <span style="font-weight:800; color:#10b981;">${o.id}</span>
                    <span style="font-size:11px; color:#94a3b8; margin-left:8px;">${o.slot}</span>
                    <div style="font-size:13px; color:#ffffff; margin-top:3px;">
                      To: <strong>${o.customer}</strong> · ${o.addr}
                    </div>
                  </div>
                  <button class="btn-delivery-action btn-accept" data-action="accept" data-order-id="${o.id}">
                    Accept Order
                  </button>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }
    `;

    // Duty Switch
    document.getElementById('btn-rider-duty-switch')?.addEventListener('click', () => {
      const next = !isRiderOnline();
      setRiderOnline(next);
      showRiderToast(next ? 'You are now Online and receiving deliveries!' : 'You are now Offline.');
      renderRiderDeliveries(container, rider);
    });

    // Spawn Demo Order
    document.getElementById('btn-spawn-order-demo')?.addEventListener('click', () => {
      spawnDemoOrder(rider.hub.split('·')[0].trim());
      showRiderToast('New delivery order dispatched to WH-2 warehouse!');
      renderRiderDeliveries(container, rider);
    });

    // Bind Order Action Buttons
    bindOrderActions(container, rider);
  }

  // ACTIVE IN-TRANSIT ORDER ("Yaha Jana Hai")
  function renderActiveOrderCard(order, rider) {
    const isPicking = order.state === 'PICKING' || order.state === 'NEW' || order.state === 'READY_FOR_PICKUP';
    const isOut = order.state === 'OUT_FOR_DELIVERY';
    const crates = order.crates || (order.lines ? Math.max(1, Math.ceil(order.lines.length / 2)) : 1);
    const estEarnings = 55 + (crates > 1 ? (crates - 1) * 15 : 0) + 20 + 35;

    return `
      <div class="rider-active-delivery-card">
        <div class="delivery-status-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="delivery-pulsing-badge"></span>
            <span style="font-weight:800; color:#ffffff; font-size:15px;">
              ${isPicking ? 'STEP 1: PICK UP CRATES AT WAREHOUSE' : 'STEP 2: EN ROUTE TO CUSTOMER'}
            </span>
          </div>
          <div style="text-align:right;">
            <span style="font-size:20px; font-weight:800; color:#f59e0b;">₹${estEarnings}</span>
            <div style="font-size:10px; color:#94a3b8;">Earnings upon handover</div>
          </div>
        </div>

        <!-- Order ID & Details -->
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <div>
            <span style="font-size:17px; font-weight:800; color:#10b981;">Order #${order.id}</span>
            <span style="font-size:11px; background:rgba(255,255,255,0.08); padding:3px 8px; border-radius:6px; margin-left:8px;">
              ${order.slot || 'Express 90 min'}
            </span>
          </div>
          <div style="font-size:12px; color:#cbd5e1;">
            📦 <strong>${crates} Chilled Crate(s)</strong>
          </div>
        </div>

        <!-- Destination Map & Address Box ("YAHA JANA HAI") -->
        <div class="delivery-route-box">
          <div class="route-point pickup">
            <div class="point-label">📍 WAREHOUSE PICKUP</div>
            <div class="point-name">${order.wh === 'WH-1' ? 'WH-1 Dark Store · DLF Phase 3' : 'WH-2 Dark Store · Sector 57 Gurugram'}</div>
            <div class="point-desc">Staging Bay #4 · Chilled crates tagged for departure</div>
          </div>

          <div class="route-point drop">
            <div class="point-label">🎯 DELIVERY DESTINATION (YAHA JANA HAI)</div>
            <div class="point-name">${order.customer || 'Customer'}</div>
            <div class="point-address">${order.addr || 'Sector 43, Gurugram'}</div>
            <div class="point-desc">Phone: ${order.phone || '+91 98123 45678'} · Payment: ${order.payMode || 'Prepaid UPI'}</div>
          </div>
        </div>

        <!-- Action Buttons: GPS Maps, Call, Complete -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:12px;">
          <button class="btn-delivery-action btn-navigate" data-action="navigate" data-order-id="${order.id}">
            🗺️ Open Google Maps GPS
          </button>
          <button class="btn-delivery-action" data-action="call" data-order-id="${order.id}" style="background:#334155; color:#ffffff;">
            📞 Call Customer
          </button>
        </div>

        <!-- Progress Action -->
        <div>
          ${
            isPicking
              ? `
            <button class="btn-delivery-action btn-pickup" data-action="pickup" data-order-id="${order.id}" style="width:100%; padding:14px; font-size:14px;">
              🏭 Arrived at Dark Store & Confirmed Crate Pickup
            </button>
          `
              : `
            <button class="btn-delivery-action btn-complete" data-action="complete" data-order-id="${order.id}" style="width:100%; padding:14px; font-size:14px;">
              ✅ Confirm Customer Handover & Complete Delivery (Earn ₹${estEarnings})
            </button>
          `
          }
        </div>
      </div>
    `;
  }

  // INCOMING ORDER ALERT BANNER ("Ye order aaya hai")
  function renderIncomingAlertCard(order, rider) {
    const crates = order.crates || (order.lines ? Math.max(1, Math.ceil(order.lines.length / 2)) : 1);
    const estEarnings = 55 + (crates > 1 ? (crates - 1) * 15 : 0) + 20 + 35;

    return `
      <div class="rider-incoming-alert-card">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
          <span style="font-size:24px; animation: ringBell 1s infinite;">🔔</span>
          <div>
            <h3 style="font-size:17px; font-weight:800; color:#ffffff; margin:0;">
              NAYA DELIVERY ORDER AAYA HAI!
            </h3>
            <p style="font-size:11px; color:#10b981; font-weight:700; margin:0;">
              Ready for immediate dispatch · Order #${order.id}
            </p>
          </div>
        </div>

        <div class="delivery-route-box">
          <div class="route-point pickup">
            <div class="point-label">Pick Up From</div>
            <div class="point-name">${order.wh || 'WH-2'} Dark Store · Sector 57 Gurugram</div>
          </div>
          <div class="route-point drop">
            <div class="point-label">Deliver To (Yaha jana hai)</div>
            <div class="point-name">${order.customer}</div>
            <div class="point-address">${order.addr}</div>
            <div class="point-desc">Est. Payout: <strong style="color:#f59e0b; font-size:15px;">₹${estEarnings}</strong> (${crates} crates · ${order.slot})</div>
          </div>
        </div>

        <div style="display:flex; gap:10px; margin-top:16px;">
          <button class="btn-delivery-action btn-accept" data-action="accept" data-order-id="${order.id}" style="flex:2; padding:14px; font-size:14px;">
            ⚡ Accept Delivery Order & Go to Dark Store
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
        handleOrderAction(action, orderId, rider);
      });
    });
  }

  function handleOrderAction(action, orderId, rider) {
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
        msg: `Accepted by rider ${rider.name} (${rider.vehicle})`
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      // Update rider status
      rider.status = 'ON_DELIVERY';
      rider.currentTrip = `${order.id} · ${order.addr ? order.addr.split('·')[0].trim() : 'Customer'}`;
      updateRiderInRoster(rider);

      showRiderToast(`Order ${orderId} accepted! Head to warehouse for crate pickup.`);
      renderRiderContent();
    } else if (action === 'pickup') {
      order.state = 'OUT_FOR_DELIVERY';
      order.events = order.events || [];
      order.events.push({
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        msg: `Crates picked up from dark store. Out for delivery.`
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      showRiderToast(`Crates verified! Order ${orderId} is now OUT FOR DELIVERY.`);
      renderRiderContent();
    } else if (action === 'navigate') {
      const addressQuery = encodeURIComponent(order.addr || 'Sector 43, Gurugram');
      window.open(`https://www.google.com/maps/search/?api=1&query=${addressQuery}`, '_blank');
    } else if (action === 'call') {
      alert(`Calling customer: ${order.customer} at ${order.phone || '+91 98123 45678'}`);
    } else if (action === 'complete') {
      const crates = order.crates || 1;
      const basePay = 55;
      const crateBonus = crates > 1 ? (crates - 1) * 15 : 0;
      const slotBonus = 20;
      const tip = 35;
      const totalEarned = basePay + crateBonus + slotBonus + tip;

      order.state = 'DELIVERED';
      order.events = order.events || [];
      order.events.push({
        at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        msg: `Delivered safely to customer doorstep by ${rider.name}.`
      });
      localStorage.setItem('orders', JSON.stringify(orders));

      // Update rider earnings
      rider.todayDeliveries += 1;
      rider.totalDeliveries += 1;
      rider.todayEarnings += totalEarned;
      rider.lifetimeEarnings += totalEarned;
      rider.balance += totalEarned;
      rider.status = 'AVAILABLE';
      rider.currentTrip = null;
      updateRiderInRoster(rider);

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

      showRiderToast(`🎉 Delivery completed! ₹${totalEarned} added to your balance.`);
      renderRiderContent();
    }
  }

  function updateRiderInRoster(rider) {
    setActiveRider(rider);
    const riders = getRiders();
    const idx = riders.findIndex((r) => r.id === rider.id);
    if (idx !== -1) {
      riders[idx] = rider;
      saveRiders(riders);
    }
  }

  // RIDER EARNINGS TAB
  function renderRiderEarnings(container, rider) {
    const ledger = getRiderLedger(rider.id);

    container.innerHTML = `
      <div class="cashout-box">
        <div class="cashout-info">
          <h4>Withdrawable Balance: ₹${rider.balance}</h4>
          <p>Linked UPI ID: <strong>${rider.upi || 'yourname@upi'}</strong> · Instant 24/7 transfer</p>
        </div>
        <button class="btn-cashout" id="btn-rider-cashout" ${rider.balance <= 0 ? 'disabled style="opacity:0.5;"' : ''}>
          💸 Instant UPI Cashout
        </button>
      </div>

      <div class="rider-kpi-grid">
        <div class="rider-kpi-card">
          <div class="rider-kpi-label">Today's Earnings</div>
          <div class="rider-kpi-value">₹${rider.todayEarnings}</div>
          <div class="rider-kpi-sub">${rider.todayDeliveries} orders delivered today</div>
        </div>
        <div class="rider-kpi-card accent">
          <div class="rider-kpi-label">Lifetime Earnings</div>
          <div class="rider-kpi-value">₹${rider.lifetimeEarnings.toLocaleString()}</div>
          <div class="rider-kpi-sub">${rider.totalDeliveries} all-time deliveries</div>
        </div>
        <div class="rider-kpi-card info">
          <div class="rider-kpi-label">Rating</div>
          <div class="rider-kpi-value">⭐ ${rider.rating}</div>
          <div class="rider-kpi-sub">98.8% On-time score</div>
        </div>
      </div>

      <div class="rider-section-header">
        <h3>📜 Delivery & Earnings Ledger (${ledger.length} trips)</h3>
      </div>

      <div class="rider-ledger-table-wrap">
        <table class="rider-ledger-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Destination</th>
              <th>Crates</th>
              <th>Pay Breakdown</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${ledger
              .map(
                (item) => `
              <tr>
                <td><strong style="color:#10b981;">${item.orderId}</strong><br><span style="font-size:10px; color:#64748b;">${item.time}</span></td>
                <td><strong>${item.customer}</strong><br><span style="font-size:11px; color:#94a3b8;">${item.address}</span></td>
                <td>${item.crates || 1} crate(s)</td>
                <td>₹${item.basePay} + ₹${(item.crateBonus || 0) + (item.slotBonus || 0)} + ₹${item.tip || 0} tip</td>
                <td><strong style="color:#f59e0b; font-size:15px;">₹${item.total}</strong></td>
                <td><span class="status-badge-paid">✓ Paid</span></td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('btn-rider-cashout')?.addEventListener('click', () => {
      if (rider.balance <= 0) return;
      const amount = rider.balance;
      rider.balance = 0;
      updateRiderInRoster(rider);
      showRiderToast(`💸 ₹${amount} sent to ${rider.upi}! Ref: TXN-${Math.floor(100000 + Math.random() * 900000)}`);
      renderRiderEarnings(container, rider);
    });
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
      { name: 'Ritu Sen', addr: 'Sector 56, Huda Colony, Gurugram' }
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
      state: 'NEW',
      crates: 2,
      lines: [
        { productId: 'tomato-hybrid', name: 'Tomato Hybrid', pack: '1 kg', qty: 2, price: 41 },
        { productId: 'spinach', name: 'Farm Spinach Bunch', pack: '2 bunches', qty: 1, price: 36 }
      ],
      events: [
        {
          at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          msg: 'Order placed by customer · Waiting for dark store pickup'
        }
      ]
    };

    orders.unshift(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
  }

  // 3. ADMIN OPS CONSOLE: INJECT RIDER FLEET ROSTER TABLE
  function injectAdminFleetManagement() {
    if (document.getElementById('admin-fleet-management-injected')) return;

    // Look for fleet map container or ops main
    const target = document.querySelector('[data-testid="card-riders-out"]')?.closest('main') ||
                   document.querySelector('main');
    if (!target) return;

    const riders = getRiders();
    const availableRiders = riders.filter((r) => r.status === 'AVAILABLE');
    const onDeliveryRiders = riders.filter((r) => r.status === 'ON_DELIVERY');

    const fleetSection = document.createElement('div');
    fleetSection.id = 'admin-fleet-management-injected';
    fleetSection.className = 'admin-fleet-box';
    fleetSection.innerHTML = `
      <div class="admin-fleet-header">
        <div>
          <h3 style="font-size:16px; font-weight:800; color:var(--text-main, #ffffff); margin:0;">
            🛵 Delivery Fleet Overview & Live Rider Roster
          </h3>
          <p style="font-size:12px; color:#94a3b8; margin:2px 0 0;">
            Real-time status of all registered riders across WH-1 (DLF) and WH-2 (Sector 57)
          </p>
        </div>

        <a href="#/rider" class="btn-open-rider-app">
          <span>🛵 Open Rider Screen</span> →
        </a>
      </div>

      <!-- Fleet Stats -->
      <div class="admin-fleet-stats-grid">
        <div class="fleet-stat-card">
          <div class="stat-label">Total Riders</div>
          <div class="stat-value">${riders.length} Registered</div>
          <div class="stat-sub">EV & Bike Fleet</div>
        </div>
        <div class="fleet-stat-card available">
          <div class="stat-label">Available / Online</div>
          <div class="stat-value" style="color:#10b981;">${availableRiders.length} Ready</div>
          <div class="stat-sub">Idle for pickup</div>
        </div>
        <div class="fleet-stat-card busy">
          <div class="stat-label">On Active Delivery</div>
          <div class="stat-value" style="color:#3b82f6;">${onDeliveryRiders.length} On Road</div>
          <div class="stat-sub">Dispatched with crates</div>
        </div>
        <div class="fleet-stat-card">
          <div class="stat-label">Fleet On-Time Rate</div>
          <div class="stat-value" style="color:#f59e0b;">98.4%</div>
          <div class="stat-sub">Avg 18 min transit</div>
        </div>
      </div>

      <!-- Live Roster Table -->
      <div class="admin-fleet-table-wrap">
        <table class="admin-fleet-table">
          <thead>
            <tr>
              <th>Rider Name</th>
              <th>Vehicle & Phone</th>
              <th>Assigned Hub</th>
              <th>Live Status</th>
              <th>Current Trip / Destination</th>
              <th>Today's Trips</th>
              <th>Rating</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${riders
              .map(
                (r) => `
              <tr>
                <td>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="rider-table-avatar">${r.avatar || 'R'}</span>
                    <strong style="color:var(--text-main, #ffffff);">${r.name}</strong>
                  </div>
                </td>
                <td>
                  <div style="font-weight:600;">${r.vehicle}</div>
                  <div style="font-size:11px; color:#94a3b8;">${r.phone}</div>
                </td>
                <td>${r.hub}</td>
                <td>
                  <span class="status-pill ${r.status === 'ON_DELIVERY' ? 'status-ondelivery' : 'status-available'}">
                    ${r.status === 'ON_DELIVERY' ? '🔵 On Delivery' : '🟢 Available & Online'}
                  </span>
                </td>
                <td>
                  <div style="font-size:12px; color:${r.currentTrip ? '#38bdf8' : '#94a3b8'};">
                    ${r.currentTrip ? r.currentTrip : 'Idle at warehouse bay'}
                  </div>
                </td>
                <td><strong>${r.todayDeliveries}</strong> deliveries (₹${r.todayEarnings})</td>
                <td><span style="color:#f59e0b;">⭐ ${r.rating}</span></td>
                <td style="text-align:right;">
                  <button class="btn-table-action" onclick="window.location.hash='#/rider'">
                    Inspect Rider →
                  </button>
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;

    target.appendChild(fleetSection);
  }

  // Initialize
  function init() {
    injectTopPanelBar();
    createRiderAppUI();
    updateActivePanelButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
