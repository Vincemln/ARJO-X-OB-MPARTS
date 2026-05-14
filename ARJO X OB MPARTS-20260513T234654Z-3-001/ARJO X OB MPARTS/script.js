// ---------- PRODUCT DATABASE ----------
const products = [
  { id: 101, name: "RCB VD Series Shocks", brand: "RCB", category: "Suspension", price: 12500, img: "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/481267559_1075521384614310_454536550162588873_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=UskLYxPbsOAQ7kNvwFSKWLw&_nc_oc=Adp262lvfgmu_FvlS9NAXYDSy4FpjsWtDUNuQDiSOxkka7N53p16Wtq55owCkH5kTUUpp6N8jA_cKrnL7C7UD-Ex&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=7F_zv7aGo6IQftqQnrMGGA&_nc_ss=7b289&oh=00_Af5eOogczoU7JULfBvphutABamAYF9BJwV655xcJwXnDHw&oe=69FCF342" },
  { id: 102, name: "UMA Racing 32mm Carburetor", brand: "UMA RACING", category: "Engine", price: 4500, img: "https://cf.shopee.ph/file/0c977d466f287e0766f563032d84784a" },
  { id: 103, name: "JVT Performance Pulley Set", brand: "JVT", category: "Transmission", price: 2800, img: "https://cf.shopee.ph/file/7f651582298971f1f9e2b170669e2c6e" },
  { id: 104, name: "MTRT High Compression Piston", brand: "MTRT", category: "Engine", price: 3200, img: "https://cf.shopee.ph/file/0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a" },
  { id: 105, name: "RCB S1 Radial Master Cylinder", brand: "RCB", category: "Brakes", price: 5800, img: "https://cf.shopee.ph/file/0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b" },
  { id: 106, name: "UMA Racing High Camshaft", brand: "UMA RACING", category: "Engine", price: 2200, img: "https://cf.shopee.ph/file/0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c" },
  { id: 107, name: "JVT V3 Muffler", brand: "JVT", category: "Exhaust", price: 8500, img: "https://cf.shopee.ph/file/0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d0d" },
  { id: 108, name: "RCB Flow Pro Radiator", brand: "RCB", category: "Cooling", price: 4200, img: "https://cf.shopee.ph/file/0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e" }
];

let editingProductId = null;

// ---------- SYSTEM CONFIG ----------
let systemConfig = JSON.parse(localStorage.getItem('systemConfig')) || {
  maintenanceMode: false,
  emailNotifications: true
};
function saveConfig() { localStorage.setItem('systemConfig', JSON.stringify(systemConfig)); }

// ---------- USER DATABASE ----------
let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, fullname: "Workshop Admin", username: "admin", password: "admin123", role: "Super Admin", purchaseHistory: [], orders: [] },
  { id: 2, fullname: "System Superboss", username: "superadmin", password: "super123", role: "Super Admin", purchaseHistory: [], orders: [] },
  { id: 3, fullname: "Regular Rider", username: "user", password: "user123", role: "User", purchaseHistory: ["Brake Pads - $89"], orders: ["Order #M101"] }
];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

function saveCurrentUser() {
  if (!currentUser) return;
  const index = users.findIndex(u => u.id === currentUser.id);
  if (index !== -1) users[index] = { ...currentUser };
  saveUsers();
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// ---------- AUTH LOGIC ----------

function loginUser(username, password) {
  const found = users.find(u => u.username === username && u.password === password);
  if (found) {
    currentUser = { ...found };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateHeaderAuth();
    renderDashboard();
    closeModal();
    return true;
  }
  alert("Access Denied: Invalid Credentials");
  return false;
}

function signupUser(fullname, email, username, password, role = "User") {
  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return false;
  }
  const newUser = {
    id: Date.now(),
    fullname,
    email,
    username,
    password,
    role,
    purchaseHistory: [],
    orders: []
  };
  users.push(newUser);
  saveUsers();
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  updateHeaderAuth();
  renderDashboard();
  alert("Welcome to the Hub!");
  return true;
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateHeaderAuth();
  const header = document.querySelector('header');
  const footer = document.querySelector('.main-footer');
  if (header) header.classList.remove('hidden');
  if (footer) footer.classList.remove('hidden');
  const dbContainer = document.getElementById('dashboardContainer');
  if (dbContainer) {
    dbContainer.className = 'container hidden';
    dbContainer.style.marginTop = '40px';
    dbContainer.style.marginBottom = '80px';
  }
  showSection('home');
}

function updateHeaderAuth() {
  const loginBtn = document.getElementById('openLoginBtn');
  const profileBtn = document.getElementById('profileBtn');
  if (!loginBtn) return;

  let label = loginBtn.querySelector('.btn-label');
  if (!label) {
    label = document.createElement('span');
    label.className = 'btn-label';
    loginBtn.innerHTML = '';
    loginBtn.appendChild(label);
  }

  if (currentUser) {
    label.innerHTML = `<i class="fas fa-sign-out-alt"></i> LOGOUT (${currentUser.username.toUpperCase()})`;
    loginBtn.classList.add('logged-in');
    loginBtn.dataset.loggedIn = 'true';
    if (profileBtn) {
      profileBtn.classList.remove('hidden');
      profileBtn.innerHTML = `<i class="fas fa-id-badge"></i> ${currentUser.role === 'Super Admin' ? 'SUPERADMIN' : 'PROFILE'}`;
      profileBtn.title = `${currentUser.fullname} — ${currentUser.role}`;
    }
  } else {
    label.innerHTML = `<i class="fas fa-user-circle"></i> LOGIN`;
    loginBtn.classList.remove('logged-in');
    loginBtn.dataset.loggedIn = 'false';
    if (profileBtn) profileBtn.classList.add('hidden');
  }
}

// ---------- DASHBOARD RENDERING ----------

function renderDashboard() {
  const dashboardDiv = document.getElementById('dashboardContainer');
  if (!currentUser) {
    dashboardDiv.classList.add('hidden');
    return;
  }

  document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));

  const role = currentUser.role;
  const header = document.querySelector('header');
  const footer = document.querySelector('.main-footer');

  if (role === 'Super Admin' || role === 'Admin') {
    if (header) header.classList.add('hidden');
    if (footer) footer.classList.add('hidden');

    dashboardDiv.className = 'sa-layout';
    dashboardDiv.style = '';

    // Sidebar nav items
    const navItems = [
      { view: 'overview', icon: 'fas fa-chart-pie', label: 'Overview' },
      { view: 'bookings', icon: 'fas fa-file-invoice', label: 'Bookings' },
      { view: 'products', icon: 'fas fa-box', label: 'Product Management' },
      { view: 'users', icon: 'fas fa-users', label: 'User Management' },
      { view: 'reports', icon: 'fas fa-chart-line', label: 'Reports' },
      { view: 'settings', icon: 'fas fa-cog', label: 'Settings' },
      { view: 'logs', icon: 'fas fa-terminal', label: 'System Logs' },
    ];

    dashboardDiv.innerHTML = `
      <div class="sa-sidebar">
        <div class="sa-brand">
          <h2>ARJO X OB</h2>
          <p>Superadmin</p>
        </div>
        <ul class="sa-nav" id="saSideNav">
          ${navItems.map((item, i) => `
            <li class="${i === 0 ? 'active' : ''}" data-view="${item.view}">
              <i class="${item.icon}"></i> ${item.label}
            </li>
          `).join('')}
        </ul>
        <ul class="sa-nav-bottom">
          <li id="saLogoutSidebar"><i class="fas fa-sign-out-alt"></i> Log Out</li>
        </ul>
      </div>
      <div class="sa-main">
        <div class="sa-topbar">
          <h1 id="saViewTitle">OVERVIEW</h1>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="sa-profile-badge">
              <span class="icon">${currentUser.fullname.charAt(0).toUpperCase()}</span>
              ${currentUser.fullname}
            </div>
            <button id="saLogoutTopbar" class="sa-logout-btn" type="button">
              <i class="fas fa-sign-out-alt"></i> Log Out
            </button>
          </div>
        </div>
        <div id="saViewContent" class="sa-content"></div>
      </div>
    `;

    // Attach sidebar nav clicks
    const navEls = dashboardDiv.querySelectorAll('.sa-nav li');
    navEls.forEach(item => {
      item.addEventListener('click', () => {
        navEls.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        renderSAView(item.dataset.view);
      });
    });

    document.getElementById('saLogoutSidebar')?.addEventListener('click', logout);
    document.getElementById('saLogoutTopbar')?.addEventListener('click', logout);

    // Render initial view
    renderSAView('overview');
    return;
  }

  // ---- renderSAView is defined here so it has closure access ----
  function renderSAView(view) {
    const content = document.getElementById('saViewContent');
    const title = document.getElementById('saViewTitle');
    if (!content || !title) return;
    title.innerText = view.replace(/-/g, ' ').toUpperCase();

    switch (view) {

      case 'overview': {
        const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
        const pendingCount = bookings.filter(b => b.status === 'Pending').length;
        const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;
        const confirmPct = bookings.length > 0 ? Math.round((confirmedCount / bookings.length) * 100) : 0;

        content.innerHTML = `
          <div class="sa-stats-grid">
            <div class="sa-card">
              <i class="fas fa-file-alt"></i>
              <h3>${bookings.length}</h3>
              <p>Total Bookings</p>
              <span class="trend"><i class="fas fa-arrow-up"></i> Live Data</span>
            </div>
            <div class="sa-card">
              <i class="fas fa-check-square"></i>
              <h3 class="stat-green">${confirmedCount}</h3>
              <p>Confirmed</p>
              <span class="trend"><i class="fas fa-arrow-up"></i> Active</span>
            </div>
            <div class="sa-card">
              <i class="fas fa-box-open"></i>
              <h3 class="stat-orange">${products.length}</h3>
              <p>Active Products</p>
              <span class="trend neutral">— In Catalog</span>
            </div>
            <div class="sa-card">
              <i class="fas fa-users"></i>
              <h3 class="stat-blue">${users.length}</h3>
              <p>Users</p>
              <span class="trend"><i class="fas fa-arrow-up"></i> Registered</span>
            </div>
          </div>

          <div class="sa-charts-grid">
            <div class="sa-chart-container">
              <div class="sa-chart-title">Bookings This Week</div>
              <div class="sa-bar-chart">
                <div class="sa-bar" style="height:40%;" data-label="Mon"></div>
                <div class="sa-bar" style="height:60%;" data-label="Tue"></div>
                <div class="sa-bar" style="height:35%;" data-label="Wed"></div>
                <div class="sa-bar" style="height:80%;" data-label="Thu"></div>
                <div class="sa-bar" style="height:55%;" data-label="Fri"></div>
                <div class="sa-bar" style="height:90%;" data-label="Sat"></div>
              </div>
            </div>
            <div class="sa-chart-container">
              <div class="sa-chart-title">Booking Status</div>
              <div class="sa-ring-chart">
                <div class="sa-ring">${confirmPct}%</div>
                <ul class="sa-legend">
                  <li>Confirmed: ${confirmedCount}</li>
                  <li>Pending: ${pendingCount}</li>
                  <li>Cancelled: ${cancelledCount}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="sa-table-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <div class="sa-chart-title" style="margin:0;">Recent Bookings</div>
              <button class="btn-outline btn sa-nav-trigger" data-target="bookings"
                style="padding:5px 14px; font-size:0.75rem; width:auto; border-radius:6px;">View All →</button>
            </div>
            <table class="sa-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${bookings.slice(-5).reverse().map(b => `
                  <tr>
                    <td>${b.customerName}</td>
                    <td>${b.item}</td>
                    <td>${b.date}</td>
                    <td><span class="sa-badge ${b.status.toLowerCase()}">${b.status}</span></td>
                  </tr>
                `).join('') || '<tr><td colspan="4" style="text-align:center;padding:30px;color:#444;">No bookings yet</td></tr>'}
              </tbody>
            </table>
          </div>
        `;
        break;
      }

      case 'bookings': {
        content.innerHTML = `
          <div class="sa-table-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <div class="sa-chart-title" style="margin:0;">Order & Service Records</div>
              <input type="text" id="bookingSearch" placeholder="Search customer..." style="padding:6px 14px; border-radius:8px; background:#0a0a0a; border:1px solid #2a2a2a; color:#fff; font-size:0.8rem; width:200px; margin:0;">
            </div>
            <table class="sa-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Item / Service</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="bookingsTbody">
                ${bookings.length > 0 ? bookings.map(b => `
                  <tr>
                    <td style="color:var(--accent-red); font-weight:700;">${b.id}</td>
                    <td>${b.date}</td>
                    <td>${b.customerName}<br><small style="color:#555;">@${b.customerUsername}</small></td>
                    <td>${b.item}<br><small style="color:#666;">${b.type}</small></td>
                    <td>₱${b.price.toLocaleString()}</td>
                    <td><span class="sa-badge ${b.status.toLowerCase()}">${b.status}</span></td>
                    <td>
                      <div style="display:flex; gap:6px;">
                        <button class="sa-action-btn" data-action="confirm" data-id="${b.id}" style="background:rgba(76,175,80,0.12); color:#4caf50; padding:4px 10px; border-radius:5px; border:none; cursor:pointer; font-size:0.72rem; font-weight:700;">Confirm</button>
                        <button class="sa-action-btn" data-action="cancel" data-id="${b.id}" style="background:rgba(207,0,0,0.12); color:var(--accent-red); padding:4px 10px; border-radius:5px; border:none; cursor:pointer; font-size:0.72rem; font-weight:700;">Cancel</button>
                      </div>
                    </td>
                  </tr>
                `).join('') : '<tr><td colspan="7" style="text-align:center;padding:40px;color:#444;">No bookings found</td></tr>'}
              </tbody>
            </table>
          </div>
        `;
        attachActionEvents();

        document.getElementById('bookingSearch')?.addEventListener('input', e => {
          const term = e.target.value.toLowerCase();
          document.querySelectorAll('#bookingsTbody tr').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
          });
        });
        break;
      }

      case 'products': {
        const editProd = editingProductId ? products.find(p => p.id === editingProductId) : null;
        content.innerHTML = `
          <div class="sa-table-container" style="margin-bottom:20px; border-color:${editingProductId ? 'rgba(207,0,0,0.3)' : '#1e1e1e'};">
            <div class="sa-chart-title">${editingProductId ? '— Edit Product' : '+ Add New Product'}</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div>
                <label style="display:block; font-size:0.7rem; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">Product Name</label>
                <input type="text" id="newProdName" value="${editProd ? editProd.name : ''}" placeholder="e.g. Performance Tires" style="width:100%; padding:10px 14px; background:#0a0a0a; border:1px solid #2a2a2a; border-radius:8px; color:#fff; margin:0;">
              </div>
              <div>
                <label style="display:block; font-size:0.7rem; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">Category</label>
                <select id="newProdCat" style="width:100%; padding:10px 14px; background:#0a0a0a; border:1px solid #2a2a2a; border-radius:8px; color:#fff; margin:0;">
                  ${['Tires', 'Engine', 'Brakes', 'Fluids', 'Transmission', 'Ignition', 'Suspension', 'Exhaust', 'Cooling'].map(c => `<option ${editProd?.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="display:block; font-size:0.7rem; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">Price (₱)</label>
                <input type="number" id="newProdPrice" value="${editProd ? editProd.price : 0}" style="width:100%; padding:10px 14px; background:#0a0a0a; border:1px solid #2a2a2a; border-radius:8px; color:#fff; margin:0;">
              </div>
              <div>
                <label style="display:block; font-size:0.7rem; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">Stock</label>
                <input type="number" id="newProdStock" value="${editProd ? (editProd.stock || 0) : 0}" style="width:100%; padding:10px 14px; background:#0a0a0a; border:1px solid #2a2a2a; border-radius:8px; color:#fff; margin:0;">
              </div>
              <div>
                <label style="display:block; font-size:0.7rem; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">Badge</label>
                <input type="text" id="newProdBadge" value="${editProd ? (editProd.badge || '') : ''}" placeholder="Best Seller / New / etc." style="width:100%; padding:10px 14px; background:#0a0a0a; border:1px solid #2a2a2a; border-radius:8px; color:#fff; margin:0;">
              </div>
              <div>
                <label style="display:block; font-size:0.7rem; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:1px;">Status</label>
                <select id="newProdStatus" style="width:100%; padding:10px 14px; background:#0a0a0a; border:1px solid #2a2a2a; border-radius:8px; color:#fff; margin:0;">
                  <option ${editProd?.status === 'Active' ? 'selected' : ''}>Active</option>
                  <option ${editProd?.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                </select>
              </div>
            </div>
            <div style="display:flex; gap:10px; margin-top:18px;">
              <button id="saveNewProdBtn" style="background:var(--accent-red); color:#fff; border:none; padding:10px 28px; border-radius:8px; font-weight:700; cursor:pointer; font-size:0.85rem; font-family:Outfit;">
                ${editingProductId ? 'Save Changes' : 'Add Product'}
              </button>
              ${editingProductId ? `<button id="cancelEditBtn" style="background:#222; color:#888; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer; font-size:0.85rem;">Cancel</button>` : ''}
            </div>
          </div>

          <div class="sa-table-container">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <div class="sa-chart-title" style="margin:0;">All Products (${products.length})</div>
              <input type="text" id="prodSearch" placeholder="Search..." style="padding:6px 14px; border-radius:8px; background:#0a0a0a; border:1px solid #2a2a2a; color:#fff; font-size:0.8rem; width:180px; margin:0;">
            </div>
            <table class="sa-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="prodTbody">
                ${products.map((p, idx) => `
                  <tr style="${editingProductId === p.id ? 'background:rgba(207,0,0,0.04);' : ''}">
                    <td style="color:#444;">${idx + 1}</td>
                    <td style="color:#ddd;">
                      ${p.name}
                      ${p.badge ? `<span style="font-size:0.6rem; background:rgba(100,150,255,0.15); color:#6496ff; padding:2px 6px; border-radius:4px; margin-left:6px; text-transform:uppercase;">${p.badge}</span>` : ''}
                    </td>
                    <td>${p.category}</td>
                    <td>₱${p.price.toLocaleString()}</td>
                    <td style="color:${(p.stock || 0) <= 5 ? 'var(--accent-red)' : '#4caf50'}">${p.stock || 0}</td>
                    <td><span class="sa-badge ${(p.status === 'Active' || (p.stock || 0) > 0) ? 'confirmed' : 'pending'}">${p.status || ((p.stock || 0) > 0 ? 'Active' : 'Inactive')}</span></td>
                    <td>
                      <div style="display:flex; gap:8px;">
                        <button class="sa-product-edit" data-id="${p.id}" style="background:${editingProductId === p.id ? 'var(--accent-red)' : 'rgba(255,255,255,0.05)'}; border:none; color:${editingProductId === p.id ? '#fff' : '#666'}; padding:4px 10px; border-radius:5px; cursor:pointer; font-size:0.7rem; font-weight:700; transition:0.2s;"><i class="fas fa-edit"></i> Edit</button>
                        <button class="sa-product-delete" data-id="${p.id}" style="background:rgba(207,0,0,0.1); border:none; color:var(--accent-red); padding:4px 10px; border-radius:5px; cursor:pointer;"><i class="fas fa-trash-alt"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        attachProductEvents();
        break;
      }

      case 'users': {
        content.innerHTML = `
          <div class="sa-table-container">
            <div class="sa-chart-title">User Accounts</div>
            <table class="sa-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${users.map(u => `
                  <tr>
                    <td style="color:#444;">${u.id}</td>
                    <td style="color:#ddd;">${u.fullname}</td>
                    <td>${u.username}</td>
                    <td><span style="color:${u.role === 'Super Admin' ? 'var(--accent-red)' : u.role === 'Admin' ? '#ff9800' : '#888'}">${u.role}</span></td>
                    <td><span class="sa-badge confirmed">Active</span></td>
                    <td>
                      ${u.role !== 'Super Admin' ? `<button class="delete-user-btn" data-id="${u.id}" style="background:none; border:none; color:var(--accent-red); cursor:pointer; opacity:0.6; transition:0.2s;"><i class="fas fa-trash-alt"></i></button>` : '—'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        content.querySelectorAll('.delete-user-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            if (confirm("Delete this user?")) {
              users = users.filter(u => u.id !== id);
              saveUsers();
              renderSAView('users');
            }
          });
        });
        break;
      }

      case 'reports': {
        content.innerHTML = `
          <div class="sa-charts-grid" style="grid-template-columns:1fr 1fr;">
            <div class="sa-chart-container">
              <div class="sa-chart-title">Revenue Growth</div>
              <div style="height:180px; display:flex; align-items:flex-end; gap:6px; border-bottom:1px solid #1e1e1e; padding-bottom:10px;">
                ${[20, 35, 50, 45, 75, 90].map(h => `<div style="flex:1; background:linear-gradient(180deg,#cf0000,#8b0000); height:${h}%; border-radius:4px 4px 0 0;"></div>`).join('')}
              </div>
              <p style="font-size:0.75rem; margin-top:12px; color:#555;">Projected growth: +24% by end of Q2</p>
            </div>
            <div class="sa-chart-container">
              <div class="sa-chart-title">Popular Categories</div>
              <div style="display:flex; flex-direction:column; gap:14px; margin-top:8px;">
                ${[['Engine Parts', '65%'], ['Workshop Services', '25%'], ['Accessories', '10%']].map(([label, pct]) => `
                  <div>
                    <div style="display:flex; justify-content:space-between; font-size:0.78rem; margin-bottom:5px; color:#888;"><span>${label}</span><span>${pct}</span></div>
                    <div style="height:6px; background:#1e1e1e; border-radius:3px;"><div style="width:${pct}; height:100%; background:var(--accent-red); border-radius:3px;"></div></div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
        break;
      }

      case 'settings': {
        content.innerHTML = `
          <div class="sa-table-container" style="max-width:540px;">
            <div class="sa-chart-title">System Configuration</div>
            <div style="display:flex; flex-direction:column; gap:22px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <h4 style="font-size:0.88rem; margin:0 0 3px; color:#ddd;">Maintenance Mode</h4>
                  <p style="font-size:0.72rem; color:#555; margin:0;">Disable public access to the store</p>
                </div>
                <div class="sa-toggle ${systemConfig.maintenanceMode ? 'active' : ''}" data-config="maintenanceMode">
                  <div class="sa-toggle-ball"></div>
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <h4 style="font-size:0.88rem; margin:0 0 3px; color:#ddd;">Email Notifications</h4>
                  <p style="font-size:0.72rem; color:#555; margin:0;">Send alerts for new bookings</p>
                </div>
                <div class="sa-toggle ${systemConfig.emailNotifications ? 'active' : ''}" data-config="emailNotifications">
                  <div class="sa-toggle-ball"></div>
                </div>
              </div>
              <hr style="border:0; border-top:1px solid #1e1e1e;">
              <button id="saveSystemChangesBtn" style="background:var(--accent-red); color:#fff; border:none; padding:14px; border-radius:10px; font-weight:700; cursor:pointer; font-size:0.88rem; font-family:Outfit; width:100%;">SAVE ALL CHANGES</button>
            </div>
            <div id="settingsStatus" style="margin-top:12px; text-align:center; font-size:0.8rem;"></div>
          </div>
        `;
        attachSettingEvents();
        break;
      }

      case 'logs': {
        const mockLogs = [
          { time: '14:20:11', user: 'superadmin', action: 'Login Success', ip: '192.168.1.1' },
          { time: '14:15:04', user: 'guest', action: 'New Booking: Engine Overhaul', ip: '110.54.21.9' },
          { time: '13:58:22', user: 'admin', action: 'Inventory Update: Shocks', ip: '192.168.1.5' },
          { time: '13:45:10', user: 'user', action: 'Signup: new_rider_01', ip: '122.3.45.112' }
        ];
        content.innerHTML = `
          <div class="sa-table-container">
            <div class="sa-chart-title">System Activity Log</div>
            <div style="font-family:monospace; font-size:0.8rem; background:#060606; padding:20px; border-radius:10px; border:1px solid #1a1a1a; max-height:400px; overflow-y:auto;">
              ${mockLogs.map(l => `
                <div style="margin-bottom:10px; line-height:1.5;">
                  <span style="color:#444;">[${l.time}]</span>
                  <span style="color:var(--accent-red); margin:0 6px;">${l.user.toUpperCase()}</span>
                  <span style="color:#aaa;">— ${l.action}</span>
                  <span style="color:#333; float:right;">${l.ip}</span>
                </div>
              `).join('')}
              <div style="color:#4caf50; margin-top:10px;">... system listening for events ...</div>
            </div>
          </div>
        `;
        break;
      }
    }

    // Internal nav triggers (e.g. "View All" → bookings)
    content.querySelectorAll('.sa-nav-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const target = trigger.dataset.target;
        const navEl = dashboardDiv.querySelector(`.sa-nav li[data-view="${target}"]`);
        if (navEl) navEl.click();
      });
    });
  }

  // ----- Product event handlers -----
  function attachProductEvents() {
    document.getElementById('saveNewProdBtn')?.addEventListener('click', () => {
      const name = document.getElementById('newProdName').value.trim();
      const cat = document.getElementById('newProdCat').value;
      const price = parseInt(document.getElementById('newProdPrice').value);
      const stock = parseInt(document.getElementById('newProdStock').value);
      const badge = document.getElementById('newProdBadge').value.trim();
      const status = document.getElementById('newProdStatus').value;

      if (name && !isNaN(price)) {
        if (editingProductId) {
          const p = products.find(prod => prod.id === editingProductId);
          if (p) { p.name = name; p.category = cat; p.price = price; p.stock = stock; p.badge = badge; p.status = status; }
          editingProductId = null;
        } else {
          products.push({ id: Date.now(), name, category: cat, price, stock, badge, status, img: "https://via.placeholder.com/200?text=New+Part" });
        }
        localStorage.setItem('products', JSON.stringify(products));
        renderSAView('products');
      } else {
        alert("Please enter at least a product name.");
      }
    });

    document.getElementById('cancelEditBtn')?.addEventListener('click', () => {
      editingProductId = null;
      renderSAView('products');
    });

    document.querySelectorAll('.sa-product-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        if (confirm("Delete this product?")) {
          const idx = products.findIndex(p => p.id === id);
          if (idx !== -1) { products.splice(idx, 1); localStorage.setItem('products', JSON.stringify(products)); renderSAView('products'); }
        }
      });
    });

    document.querySelectorAll('.sa-product-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        editingProductId = parseInt(btn.dataset.id);
        renderSAView('products');
      });
    });

    document.getElementById('prodSearch')?.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('#prodTbody tr').forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  function attachSettingEvents() {
    document.querySelectorAll('.sa-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const key = toggle.dataset.config;
        systemConfig[key] = !systemConfig[key];
        toggle.classList.toggle('active');
        saveConfig();
      });
    });
    document.getElementById('saveSystemChangesBtn')?.addEventListener('click', () => {
      const status = document.getElementById('settingsStatus');
      status.innerHTML = '<span style="color:#4caf50;">✔ System configuration saved successfully!</span>';
      setTimeout(() => status.innerHTML = '', 3000);
    });
  }

  function attachActionEvents() {
    document.querySelectorAll('.sa-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const booking = bookings.find(b => b.id === id);
        if (booking) {
          booking.status = action === 'confirm' ? 'Confirmed' : 'Cancelled';
          localStorage.setItem('bookings', JSON.stringify(bookings));
          renderSAView('bookings');
        }
      });
    });
  }

  // ===================== STANDARD USER DASHBOARD =====================
  if (header) header.classList.remove('hidden');
  if (footer) footer.classList.remove('hidden');
  dashboardDiv.className = 'container';
  dashboardDiv.style.marginTop = '40px';
  dashboardDiv.style.marginBottom = '80px';
  dashboardDiv.classList.remove('hidden');

  dashboardDiv.innerHTML = `
    <div class="dashboard-panel" style="background:var(--bg-secondary); border-radius:32px; padding:40px; border:1px solid var(--glass-border); box-shadow:0 40px 100px rgba(0,0,0,0.5);">
      <div class="dashboard-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:40px; border-bottom:1px solid var(--glass-border); padding-bottom:20px;">
        <div>
          <h2 style="color:var(--accent-red); font-size:2rem;"><i class="fas fa-tachometer-alt"></i> RIDER PANEL</h2>
          <p style="color:var(--text-secondary);">Welcome back, ${currentUser.fullname}</p>
        </div>
        <button id="dashboardLogoutBtn" class="btn" style="background:var(--accent-red); color:#fff; padding:10px 25px; font-size:0.9rem; width:auto;">LOGOUT</button>
      </div>
      <div class="dashboard-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px;">
        <!-- PROFILE -->
        <div class="admin-section" style="background:rgba(255,255,255,0.03); padding:25px; border-radius:20px; border:1px solid var(--glass-border);">
          <h3 style="color:var(--accent-red); margin-bottom:20px;"><i class="fas fa-id-card"></i> My Profile</h3>
          <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px;">
            <div style="width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,var(--accent-red),#ff4444); display:flex; align-items:center; justify-content:center; font-size:1.6rem; font-weight:800; color:#fff; flex-shrink:0;">
              ${currentUser.fullname ? currentUser.fullname.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <p style="font-size:1rem; font-weight:700; color:#fff; margin:0;">${currentUser.fullname}</p>
              <span style="font-size:0.7rem; padding:3px 8px; border-radius:4px; background:#333; color:#fff; font-weight:700;">${currentUser.role}</span>
            </div>
          </div>
          <div id="profileViewMode">
            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
              <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:rgba(0,0,0,0.2); border-radius:10px;">
                <i class="fas fa-user" style="color:var(--accent-red); width:16px;"></i>
                <span style="font-size:0.85rem; color:var(--text-secondary);">Username:</span>
                <span style="font-size:0.9rem; color:#fff; margin-left:auto;">${currentUser.username}</span>
              </div>
              <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:rgba(0,0,0,0.2); border-radius:10px;">
                <i class="fas fa-envelope" style="color:var(--accent-red); width:16px;"></i>
                <span style="font-size:0.85rem; color:var(--text-secondary);">Email:</span>
                <span style="font-size:0.9rem; color:#fff; margin-left:auto;">${currentUser.email || '<em style="color:#555;">Not set</em>'}</span>
              </div>
            </div>
            <button id="editProfileBtn" class="btn-outline btn" style="width:100%; font-size:0.85rem;"><i class="fas fa-pencil-alt"></i> EDIT PROFILE</button>
          </div>
          <div id="profileEditMode" style="display:none;">
            <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:15px;">
              <input type="text" id="editFullname" value="${currentUser.fullname}" placeholder="Full Name" style="width:100%; padding:12px; border-radius:8px; background:rgba(255,255,255,0.05); border:1px solid var(--glass-border); color:#fff; font-size:0.9rem; box-sizing:border-box; margin:0;">
              <input type="email" id="editEmail" value="${currentUser.email || ''}" placeholder="Email Address" style="width:100%; padding:12px; border-radius:8px; background:rgba(255,255,255,0.05); border:1px solid var(--glass-border); color:#fff; font-size:0.9rem; box-sizing:border-box; margin:0;">
            </div>
            <div style="display:flex; gap:8px;">
              <button id="saveProfileBtn" class="btn" style="flex:1; font-size:0.85rem; padding:12px; background:var(--accent-red); color:#fff;">SAVE</button>
              <button id="cancelEditProfileBtn" class="btn-outline btn" style="flex:1; font-size:0.85rem; padding:12px;">CANCEL</button>
            </div>
            <div id="profileSaveStatus" style="margin-top:10px; font-size:0.8rem; text-align:center;"></div>
          </div>
        </div>
        <!-- ORDERS -->
        <div class="admin-section" style="background:rgba(255,255,255,0.03); padding:25px; border-radius:20px; border:1px solid var(--glass-border);">
          <h3 style="color:var(--accent-red); margin-bottom:20px;"><i class="fas fa-shopping-bag"></i> My Orders</h3>
          <ul style="list-style:none; padding:0;">
            ${currentUser.orders?.map(o => `<li style="padding:10px; background:rgba(255,255,255,0.04); border-radius:8px; margin-bottom:8px; font-size:0.9rem;">${o}</li>`).join('') || '<li style="color:#555; padding:10px;">No orders found</li>'}
          </ul>
        </div>
        <!-- PURCHASE HISTORY -->
        <div class="admin-section" style="background:rgba(255,255,255,0.03); padding:25px; border-radius:20px; border:1px solid var(--glass-border);">
          <h3 style="color:var(--accent-red); margin-bottom:20px;"><i class="fas fa-history"></i> Purchase History</h3>
          <ul style="list-style:none; padding:0;">
            ${currentUser.purchaseHistory?.map(item => `<li style="padding:10px; background:rgba(255,255,255,0.04); border-radius:8px; margin-bottom:8px; font-size:0.9rem;">${item}</li>`).join('') || '<li style="color:#555; padding:10px;">No purchase history yet</li>'}
          </ul>
        </div>
      </div>
    </div>
  `;
  attachDashboardEvents();

  // Hide other sections
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));

  function attachDashboardEvents() {
    document.getElementById('dashboardLogoutBtn')?.addEventListener('click', logout);

    document.getElementById('editProfileBtn')?.addEventListener('click', () => {
      document.getElementById('profileViewMode')?.classList.add('hidden');
      document.getElementById('profileEditMode')?.style.setProperty('display', 'block');
    });

    document.getElementById('cancelEditProfileBtn')?.addEventListener('click', () => {
      document.getElementById('profileEditMode')?.style.setProperty('display', 'none');
      document.getElementById('profileViewMode')?.classList.remove('hidden');
    });

    document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
      const newFullname = document.getElementById('editFullname')?.value.trim();
      const newEmail = document.getElementById('editEmail')?.value.trim();
      const statusEl = document.getElementById('profileSaveStatus');
      if (!newFullname) {
        if (statusEl) { statusEl.textContent = 'Please enter your name.'; statusEl.style.color = '#ff6b6b'; }
        return;
      }
      currentUser.fullname = newFullname;
      currentUser.email = newEmail;
      saveCurrentUser();
      if (statusEl) { statusEl.textContent = 'Profile updated!'; statusEl.style.color = '#4caf50'; }
      setTimeout(() => renderDashboard(), 500);
    });
  }
}

// ---------- UI LOGIC ----------

function renderProducts(filterBrand = 'All') {
  const grid = document.getElementById('partsGrid');
  if (!grid) return;

  const filtered = filterBrand === 'All' ? products : products.filter(p => p.brand === filterBrand);

  grid.innerHTML = filtered.map(p => `
    <div class="card">
      <span class="brand-badge">${p.brand}</span>
      <img src="${p.img}" alt="${p.name}" class="card-img">
      <h3>${p.name}</h3>
      <p style="color:#888; font-size:0.85rem; margin-bottom:8px;">${p.category}</p>
      <p class="price">₱${p.price.toLocaleString()}</p>
      <button class="btn part-order" data-part="${p.name}" data-price="${p.price}">Order Now</button>
    </div>
  `).join('');

  attachPartEvents();
}

function attachPartEvents() {
  document.querySelectorAll('.part-order').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!currentUser) { alert("Please login to place an order."); openModal(); return; }
      const partName = btn.dataset.part;
      const partPrice = btn.dataset.price;
      if (!currentUser.orders) currentUser.orders = [];
      if (!currentUser.purchaseHistory) currentUser.purchaseHistory = [];
      currentUser.orders.push(`${partName} - ₱${parseInt(partPrice).toLocaleString()} (Pending)`);
      currentUser.purchaseHistory.push(`${partName} - ₱${parseInt(partPrice).toLocaleString()} [${new Date().toLocaleDateString()}]`);
      saveCurrentUser();
      const originalText = btn.innerText;
      btn.innerText = "✔ ORDERED";
      btn.style.background = "var(--accent-green)";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
        btn.disabled = false;
        if (confirm("Item added to your orders! View dashboard?")) { renderDashboard(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      }, 1500);
    });
  });
}

function setupFilters() {
  const filterBar = document.getElementById('filterBar');
  if (!filterBar) return;
  const brands = ['All', ...new Set(products.map(p => p.brand))];
  filterBar.innerHTML = brands.map(b => `<button class="filter-btn ${b === 'All' ? 'active' : ''}" data-brand="${b}">${b}</button>`).join('');
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.brand);
    });
  });
}

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(id => id.classList.add('hidden'));
  const activeSec = document.getElementById(`${sectionId}Section`);
  if (activeSec) activeSec.classList.remove('hidden');
  document.getElementById('dashboardContainer').classList.add('hidden');
  updateNavActive(sectionId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavActive(active) {
  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === active);
  });
}

// ---------- MODAL ----------
const modal = document.getElementById('authModal');
function openModal() {
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  document.getElementById('loginFormPanel')?.classList.remove('hidden');
  document.getElementById('signupFormPanel')?.classList.add('hidden');
}
function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.style.display = 'none';
}

function setupAuthHandlers() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.auth-role-tab')) {
      const tabs = document.querySelectorAll('.auth-role-tab');
      tabs.forEach(t => { t.classList.remove('active'); t.style.background = 'transparent'; t.style.color = '#555'; t.style.fontWeight = '600'; });
      const at = e.target.closest('.auth-role-tab');
      at.classList.add('active'); at.style.background = 'var(--accent-red)'; at.style.color = '#fff'; at.style.fontWeight = '700';
      return;
    }
    if (e.target.closest('#openLoginBtn')) {
      e.preventDefault();
      if (currentUser) { if (confirm(`Logout from ${currentUser.username}?`)) logout(); } else { openModal(); }
      return;
    }
    if (e.target.closest('#closeModalBtn')) { closeModal(); return; }
    if (e.target.closest('#profileBtn')) { e.preventDefault(); if (currentUser) { renderDashboard(); } else { openModal(); } return; }
    if (e.target === modal) { closeModal(); return; }
    if (e.target.closest('#showSignupLink')) { e.preventDefault(); document.getElementById('loginFormPanel').classList.add('hidden'); document.getElementById('signupFormPanel').classList.remove('hidden'); return; }
    if (e.target.closest('#showLoginLink')) { e.preventDefault(); document.getElementById('signupFormPanel').classList.add('hidden'); document.getElementById('loginFormPanel').classList.remove('hidden'); return; }
  });

  document.getElementById('doLoginBtn')?.addEventListener('click', () => {
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value.trim();
    if (u && p) loginUser(u, p); else alert("Please enter both fields");
  });

  ['loginUsername', 'loginPassword'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('doLoginBtn').click(); });
  });

  document.getElementById('doSignupBtn')?.addEventListener('click', () => {
    const f = document.getElementById('signupFullname').value.trim();
    const e = document.getElementById('signupEmail').value.trim();
    const u = document.getElementById('signupUsername').value.trim();
    const p = document.getElementById('signupPassword').value.trim();
    const r = document.getElementById('signupRole').value;
    if (f && u && p) signupUser(f, e, u, p, r); else alert("Please fill in required fields");
  });
}

function fixNavItems() {
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', e => { e.preventDefault(); showSection(link.dataset.nav); });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFilters();
  showSection('home');
  startHeroSlider();
  setupAuthHandlers();
  fixNavItems();
  updateHeaderAuth();
  if (currentUser) renderDashboard();
});

let currentSlide = 0;
function startHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt && window.scrollY > 500) btt.classList.add('show'); else if (btt) btt.classList.remove('show');
});

document.getElementById('sendInquiryBtn')?.addEventListener('click', () => {
  const name = document.getElementById('contactName').value;
  if (!name) { alert("Please enter your name."); return; }
  document.getElementById('contactForm').classList.add('hidden');
  document.getElementById('contactSuccess').classList.remove('hidden');
});

function resetContactForm() {
  document.getElementById('contactForm')?.classList.remove('hidden');
  document.getElementById('contactSuccess')?.classList.add('hidden');
  ['contactName', 'contactEmail', 'contactMessage'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

document.addEventListener('click', (e) => {
  const partBtn = e.target.closest('.part-order');
  const serviceBtn = e.target.closest('.service-book');
  if (partBtn) {
    const partName = partBtn.dataset.part;
    const partData = products.find(p => p.name === partName);
    localStorage.setItem('lastSelection', JSON.stringify({ name: partName, price: partData ? partData.price : 0, type: 'Part' }));
    window.location.href = 'booking.html';
  }
  if (serviceBtn) {
    const serviceName = serviceBtn.dataset.service;
    const servicePrices = { "Full Overhaul": 15000, "CVT Cleaning": 500, "Dyno Tuning": 3500, "Throttle Body Cleaning": 800, "PMS": 1200, "Shock Repack": 2500 };
    localStorage.setItem('lastSelection', JSON.stringify({ name: serviceName, price: servicePrices[serviceName] || 0, type: 'Service' }));
    window.location.href = 'booking.html';
  }
});