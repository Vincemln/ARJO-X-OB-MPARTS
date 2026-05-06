// ---------- PRODUCT DATABASE ----------
const products = [
  // JVT (Philippines Performance)
  { id: 1, name: "JVT V3 Performance Pulley Set", brand: "JVT", price: 1850, category: "Transmission", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5hI-VE60Tnvo_X75UUYuY6pgwNcOhGWDq8A&s" },
  { id: 2, name: "JVT Racing Clutch Lining", brand: "JVT", price: 1250, category: "Transmission", img: "https://one1616.com/cdn/shop/files/Myproject_20250623_172353_695x695.jpg?v=1750670900" },
  { id: 3, name: "JVT Flyball Set (Straight/Mixed)", brand: "JVT", price: 450, category: "Transmission", img: "https://one1616.com/cdn/shop/files/Myproject_20250524_163302_1200x1200.jpg?v=1748075862" },
  { id: 4, name: "JVT Performance Belt (Kevlar)", brand: "JVT", price: 1100, category: "Transmission", img: "https://scontent.fmnl4-2.fna.fbcdn.net/v/t39.30808-6/480565432_652490480677866_6913380849816390930_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=A3u8ALRvwREQ7kNvwFnMBHy&_nc_oc=AdpdURMsikoyX7co2Nj4VzAG8NHfP09swTMkkmNCiLwIX_zaSEjsXE2cJdzrPszS8wyHZjviucfaDpJ0Vd0oivmi&_nc_zt=23&_nc_ht=scontent.fmnl4-2.fna&_nc_gid=_Ar73A2eDOCQxJe5X-ecDQ&_nc_ss=7b289&oh=00_Af6dOX-hI56TqmONHRjkGFexs9wSuWG8iA4o7uYM8-bmFQ&oe=69FCFB2E" },

  // MTRT (Taiwan/PH Racing)
  { id: 5, name: "MTRT High Compression Piston 59mm", brand: "MTRT", price: 2800, category: "Engine", img: "https://d2j6dbq0eux0bg.cloudfront.net/images/20179066/4559191376.jpg" },
  { id: 6, name: "MTRT Stage 2 Racing Camshaft", brand: "MTRT", price: 1950, category: "Engine", img: "https://d2j6dbq0eux0bg.cloudfront.net/images/20179066/1469738506.jpg" },
  { id: 7, name: "MTRT Dual Valve Springs", brand: "MTRT", price: 1200, category: "Engine", img: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98o-lvli80mujqo502" },
  { id: 8, name: "MTRT Evo 2 Exhaust Pipe", brand: "MTRT", price: 4500, category: "Exhaust", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLkEIJDCXStg_hIMR_wf1isv5mx8dwxCpTA&s" },

  // UMA Racing (Malaysia/Asia Racing)
  { id: 9, name: "UMA Racing 32mm Carburetor (PWK)", brand: "UMA Racing", price: 4200, category: "Fuel System", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueXpJQIrF7E0aiJ8CCCkM8BFlQ2IFrIe1_g&s" },
  { id: 10, name: "UMA Racing IMC Digital CDI", brand: "UMA Racing", price: 3800, category: "Electrical", img: "https://umaracing.com/wp-content/uploads/2022/05/cdi-4map.png" },
  { id: 11, name: "UMA Racing High Flow Oil Pump", brand: "UMA Racing", price: 1500, category: "Engine", img: "https://scontent.fmnl4-7.fna.fbcdn.net/v/t1.6435-9/64678291_2420527247986514_1154942003251773440_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=DjmRXOb5pwUQ7kNvwHv2KeL&_nc_oc=Adotgh9lyETzYEfQWycI4oSLJ9UFG7__Dqqrcxju-aSIXvfAFom_bh5wZw0o4lCO_1WR_gc8frgZzwG8pWt-vcDx&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=covZkwziJaabUOVcMFYVVA&_nc_ss=7b289&oh=00_Af769wrH37LpKDfMkESdVxjA2I1nXdHwxIzYH4g6UppMKw&oe=6A1EB757" },
  { id: 12, name: "UMA Racing Quick Shifter Kit", brand: "UMA Racing", price: 8500, category: "Electrical", img: "https://scontent.fmnl4-6.fna.fbcdn.net/v/t1.6435-9/62107258_2405760922796480_8490512554433445888_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_ohc=PvBwUldBP5YQ7kNvwHgA55z&_nc_oc=AdprvAvrRc7DafoUf5p675b2NakMv2EQp7AJt3BzpNnuUVJ9t_YI9dtTsvn9WnNDv2rzrXiuKPwYrTmV_Hq_2aVL&_nc_zt=23&_nc_ht=scontent.fmnl4-6.fna&_nc_gid=CRRWwXGgq_0pXUR4SYrTKA&_nc_ss=7b289&oh=00_Af77VGnuRdkF5uozzxdLqODeWOpdgM6waR-dxfp60NPqaQ&oe=6A1EA8BF" },

  // RCB (Racing Boy - Accessories/Brakes)
  { id: 13, name: "RCB VD Series Rear Shock 305mm", brand: "RCB", price: 6800, category: "Suspension", img: "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/481267559_1075521384614310_454536550162588873_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=UskLYxPbsOAQ7kNvwFSKWLw&_nc_oc=Adp262lvfgmu_FvlS9NAXYDSy4FpjsWtDUNuQDiSOxkka7N53p16Wtq55owCkH5kTUUpp6N8jA_cKrnL7C7UD-Ex&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=7F_zv7aGo6IQftqQnrMGGA&_nc_ss=7b289&oh=00_Af5eOogczoU7JULfBvphutABamAYF9BJwV655xcJwXnDHw&oe=69FCF342" },
  { id: 14, name: "RCB S1 Radial Brake Master (14mm)", brand: "RCB", price: 3200, category: "Brakes", img: "https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/484812164_973947511541919_8868724401316476368_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=7EWCR-juS8UQ7kNvwEokHJC&_nc_oc=AdrH0AQ18VZd9YXfM2ElfddI-tzBLuRIrkAoKDfI0Cfgqu51trFiTa4mcKnmO964G43qCdcvGmmpfk7MYFBAVv16&_nc_zt=23&_nc_ht=scontent.fmnl4-3.fna&_nc_gid=3rG-4bZ4uD63p7Oc1un5HQ&_nc_ss=7b289&oh=00_Af5dDqETWzsic6NYa9qWe0QnmPAOpdoRlBxyWqm_pio_Ag&oe=69FD0E07" },
  { id: 15, name: "RCB R34 4-Pot Radial Brake Caliper", brand: "RCB", price: 2500, category: "Brakes", img: "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/600333028_1321797389986707_461301420779030067_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=-kbBYBglm54Q7kNvwETOXn-&_nc_oc=Adpvb1hMRk9lLHIK2cB-K6FNVHGdVYBZFnJfT6j3s3jj5YvZykcZu6KIr6RjWQhZBUZMFAC37JlrRdzZKeU1Tncr&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=_t-YACc3wd2MJ3orSvpRgg&_nc_ss=7b289&oh=00_Af414Fir1rgzmmPamFIh74UQ6z0QqJkrOsa-U-gFnYLMsQ&oe=69FD2499" },
  { id: 16, name: "RCB SP800 Lightweight Racing Mags", brand: "RCB", price: 7500, category: "Wheels", img: "https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/487147048_1104940218339093_6701699874367988935_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=5_1VOf5BtR4Q7kNvwHbrB1l&_nc_oc=Adrly0K5Ue6sF2An5VCVDIatRxaQ7SX8YuAqo8OnTR9k6aUGMGQ0ipCQQl3O45tVRoPmgKIjteVn0xclG6DNMkGU&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=JNHv9YehxuOU6AkBrc4CCg&_nc_ss=7b289&oh=00_Af7XVHA_v6fMevojoqTnSQ1Q2NfHDAfZC7IlfY_U_WsxUQ&oe=69FD041F" },

  // TSMP (Engine Specialists)
  { id: 17, name: "TSMP 63mm Ceramic Cylinder Block", brand: "TSMP", price: 4800, category: "Engine", img: "https://img2.biggo.com/175x,q75,svUqIBDpHrze85a2z_PZYP4WnmoOCN3gMG6fVEwrxBzM/https://cf.shopee.ph/file/ph-11134207-7rash-m6cr9mfmut8u2e" },
  { id: 18, name: "TSMP S4 Power Pipe", brand: "TSMP", price: 5799, category: "Exhaust", img: "https://ph-live-01.slatic.net/p/527df44ff21817d81598a38f290000d1.png" },

  // HIRC (CVT Specialists)
  { id: 19, name: "HIRC V2 Pulley & Drive Face", brand: "HIRC", price: 1650, category: "Transmission", img: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98x-loar4ts9q4gb3a" },
  { id: 20, name: "HIRC Lightweight Clutch Bell", brand: "HIRC", price: 1400, category: "Transmission", img: "https://down-ph.img.susercontent.com/file/ph-11134207-7r98r-lvzhxsldfzesc2" },

  // RS8 (Performance & Style)
  { id: 21, name: "RS8 High-Speed Pulley Kit", brand: "RS8", price: 1750, category: "Transmission", img: "https://rs8.com.ph/wp-content/uploads/2023/06/Lazada_-_RS8_TARAGSIT_PULLEY_SET_RED-1024x1024.webp " },
  { id: 22, name: "The RS8 Redlac", brand: "RS8", price: 12499, category: "Exhaust", img: "https://img.lazcdn.com/g/p/e36b3fd84d797f78839b9b4d12dfe12b.jpg_960x960q80.jpg_.webp" },
  { id: 23, name: "RS8 1500RPM Center Spring", brand: "RS8", price: 650, category: "Transmission", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3-66Ywm1UDQjYiOTZBUzhHyDsH3ip55kWtQ&s" },

  // KOSO (Digital Instruments)
  { id: 24, name: "KOSO RX2N Digital Speedometer", brand: "KOSO", price: 8200, category: "Electrical", img: "https://my-test-11.slatic.net/p/2aa43af3df5de099e75724ed85801176.jpg" },
  { id: 25, name: "KOSO Mini 3 Voltmeter/Clock/Temp", brand: "KOSO", price: 1850, category: "Electrical", img: "https://global-fs.webike-cdn.net/catalogue/14762/04292333_517e84cf54709.jpg" },
  { id: 26, name: "KOSO 32mm Big Throttle Body", brand: "KOSO", price: 3800, category: "Fuel System", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rlYlvcEZQyaUPM04zQRaRKSlx_hHf_7yPA&s" },

  // CRP (Cooling Systems)
  { id: 27, name: "CRP Oversized Aluminum Radiator", brand: "CRP", price: 2400, category: "Cooling", img: "https://filebroker-cdn.lazada.com.ph/kf/S142f64dbacd34771855dfb65a14cd8b5F.jpg" },
  { id: 28, name: "CRP PowerCam Stage 1 Camshaft", brand: "CRP", price: 1650, category: "Engine", img: "https://laz-img-sg.alicdn.com/p/e56e001b6f3514cd260b66d83a8271a6.jpg" },

  // BWIN (Wheels & Spokes)
  { id: 29, name: "BWIN Center Springs (800-1500 RPM)", brand: "BWIN", price: 550, category: "Transmission", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5nTjARCZ0BQgPgJiW499qND6grRE-2Za0RQ&s" },
  { id: 30, name: "BWIN Clutch Springs (1500-2000 RPM)", brand: "BWIN", price: 550, category: "Transmission", img: "https://down-ph.img.susercontent.com/file/ph-11134207-7ras9-m0tvhpt687la03" },

  // GENUINE PARTS - YAMAHA
  { id: 31, name: "Yamaha Genuine Drive Belt (Mio)", brand: "Yamaha", price: 1050, category: "Genuine Parts", img: "https://down-ph.img.susercontent.com/file/ph-11134207-81ztf-mkytosvigydhb6" },
  { id: 32, name: "Yamaha Yamalube Performance Oil", brand: "Yamaha", price: 380, category: "Genuine Parts", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQol1SDy4AnkbUGcMOWcvIhm1Ns7PPEWJKsqA&s" },
  { id: 33, name: "Yamaha Genuine Air Filter Element", brand: "Yamaha", price: 250, category: "Genuine Parts", img: "https://www.tenplus.ph/cdn/shop/products/AirFilterMioi1252_1024x.jpg?v=1656943018" },

  // GENUINE PARTS - HONDA
  { id: 34, name: "Honda Genuine Brake Pads (Front)", brand: "Honda", price: 420, category: "Genuine Parts", img: "https://www.tenplus.ph/cdn/shop/products/06455-KVB-T01_1271fbb6-34a4-44b3-a01b-071b6f3e4841.jpg?v=1736185365" },
  { id: 35, name: "Honda Genuine CVT Belt (Click 125)", brand: "Honda", price: 1150, category: "Genuine Parts", img: "https://www.tenplus.ph/cdn/shop/products/BeltDrive_9417f43b-abb3-4fb9-90e1-7463f57a0d94.jpg?v=1736185797&width=1920" },
  { id: 36, name: "Honda Genuine Fully Synthetic Oil", brand: "Honda", price: 280, category: "Genuine Parts", img: "https://www.tenplus.ph/cdn/shop/products/Honda4TSL10W-30MA.jpg?v=1637217218" },

  // GENUINE PARTS - SUZUKI
  { id: 37, name: "Suzuki Genuine Gasket Set (Raider)", brand: "Suzuki", price: 850, category: "Genuine Parts", img: "https://ph-test-11.slatic.net/p/34959229ae63e421998a8cabe61a8c52.jpg" },
  { id: 38, name: "Suzuki Genuine Oil Filter", brand: "Suzuki", price: 150, category: "Genuine Parts", img: "https://ph-test-11.slatic.net/p/27156c628b9bc3f93317d51607910a45.png" },
  { id: 39, name: "Suzuki Genuine Throttle Cable", brand: "Suzuki", price: 450, category: "Genuine Parts", img: "https://filebroker-cdn.lazada.com.ph/kf/S5fcc844b065c4a7690c7a3956a143493G.jpg" }
];

// ---------- USER DATABASE ----------
let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, fullname: "Workshop Admin", username: "admin", password: "admin123", role: "Admin", purchaseHistory: [], orders: [] },
  { id: 2, fullname: "System Superboss", username: "superadmin", password: "super123", role: "Super Admin", purchaseHistory: [], orders: [] },
  { id: 3, fullname: "Regular Rider", username: "user", password: "user123", role: "User", purchaseHistory: ["Brake Pads - $89"], orders: ["Order #M101"] }
];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

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
    fullname: fullname,
    email: email,
    username: username,
    password: password,
    role: role,
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
  document.getElementById('dashboardContainer').classList.add('hidden');
  showSection('home');
}

// ---------- KEY FIX: updateHeaderAuth uses data attributes, NOT innerHTML ----------
// Changing innerHTML destroys the element's event listeners every time.
// Instead, we update only the text/icon span inside the button.

function updateHeaderAuth() {
  const loginBtn = document.getElementById('openLoginBtn');
  const profileBtn = document.getElementById('profileBtn');
  if (!loginBtn) return;

  // Find or create the inner label span so we never touch the button's listener
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
    if (profileBtn) {
      profileBtn.classList.add('hidden');
    }
  }
}

// ---------- DASHBOARD RENDERING ----------

function renderDashboard() {
  const dashboardDiv = document.getElementById('dashboardContainer');
  if (!currentUser) {
    dashboardDiv.classList.add('hidden');
    return;
  }
  
  const role = currentUser.role;
  dashboardDiv.classList.remove('hidden');
  
  let dashboardHTML = `
    <div class="dashboard-panel" style="background: var(--bg-secondary); border-radius: 32px; padding: 40px; border: 1px solid var(--glass-border); box-shadow: 0 40px 100px rgba(0,0,0,0.5);">
      <div class="dashboard-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid var(--glass-border); padding-bottom: 20px;">
        <div>
          <h2 style="color: var(--accent-gold); font-size: 2rem;"><i class="fas fa-tachometer-alt"></i> ${role.toUpperCase()} PANEL</h2>
          <p style="color: var(--text-secondary);">Welcome back, ${currentUser.fullname}</p>
        </div>
        <button id="dashboardLogoutBtn" class="btn" style="background: var(--accent-red); padding: 10px 25px; font-size: 0.9rem;">LOGOUT</button>
      </div>
      
      <div class="dashboard-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
  `;

  // Super Admin: User Management
  if (role === 'Super Admin') {
    dashboardHTML += `
      <div class="admin-section" style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid var(--glass-border);">
        <h3 style="color: var(--accent-gold); margin-bottom: 20px;"><i class="fas fa-users-cog"></i> User Management</h3>
        <div style="max-height: 300px; overflow-y: auto; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="text-align: left; border-bottom: 1px solid var(--glass-border); color: var(--text-secondary); font-size: 0.8rem;">
                <th style="padding: 10px;">NAME</th>
                <th style="padding: 10px;">ROLE</th>
                <th style="padding: 10px;">ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 12px; font-size: 0.9rem;">${u.fullname}</td>
                  <td style="padding: 12px;"><span style="font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; background: ${u.role === 'Super Admin' ? 'var(--accent-gold)' : u.role === 'Admin' ? '#3498db' : '#555'}; color: #000; font-weight: 700;">${u.role}</span></td>
                  <td style="padding: 12px;">
                    ${u.id !== currentUser.id ? `<button class="delete-user-btn" data-id="${u.id}" style="background: none; border: none; color: var(--accent-red); cursor: pointer;"><i class="fas fa-trash"></i></button>` : '<i class="fas fa-lock" style="color: #444;"></i>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Admin & Super Admin: Product Management
  if (role === 'Admin' || role === 'Super Admin') {
    dashboardHTML += `
      <div class="admin-section" style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid var(--glass-border);">
        <h3 style="color: var(--accent-gold); margin-bottom: 20px;"><i class="fas fa-boxes"></i> Product Management</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">Inventory status and performance tracking.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; text-align: center;">
            <span style="display: block; font-size: 1.5rem; font-weight: 800; color: #fff;">${products.length}</span>
            <span style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase;">Total Parts</span>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; text-align: center;">
            <span style="display: block; font-size: 1.5rem; font-weight: 800; color: var(--accent-green);">Live</span>
            <span style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase;">Status</span>
          </div>
        </div>
        <button id="syncInventoryBtn" class="btn-outline btn" style="width: 100%;">SYNC GLOBAL INVENTORY</button>
        <div id="syncStatus" style="margin-top: 10px; font-size: 0.8rem; text-align: center;"></div>
      </div>
    `;
  }

  // User Dashboard
  if (role === 'User') {
    dashboardHTML += `
      <!-- MY PROFILE CARD -->
      <div class="admin-section" style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid var(--glass-border);">
        <h3 style="color: var(--accent-gold); margin-bottom: 20px;"><i class="fas fa-id-card"></i> My Profile</h3>

        <!-- Avatar + Role Badge -->
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-gold), #ff6b35); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; font-weight: 800; color: #000; flex-shrink: 0;">
            ${currentUser.fullname ? currentUser.fullname.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <p style="font-size: 1rem; font-weight: 700; color: #fff; margin: 0;">${currentUser.fullname}</p>
            <span style="font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; background: #555; color: #fff; font-weight: 700;">${currentUser.role}</span>
          </div>
        </div>

        <!-- Profile Fields (view mode) -->
        <div id="profileViewMode">
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(0,0,0,0.2); border-radius: 10px;">
              <i class="fas fa-user" style="color: var(--accent-gold); width: 16px;"></i>
              <span style="font-size: 0.85rem; color: var(--text-secondary);">Username:</span>
              <span style="font-size: 0.9rem; color: #fff; margin-left: auto;">${currentUser.username}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: rgba(0,0,0,0.2); border-radius: 10px;">
              <i class="fas fa-envelope" style="color: var(--accent-gold); width: 16px;"></i>
              <span style="font-size: 0.85rem; color: var(--text-secondary);">Email:</span>
              <span style="font-size: 0.9rem; color: #fff; margin-left: auto;">${currentUser.email || '<em style="color:#555;">Not set</em>'}</span>
            </div>
          </div>
          <button id="editProfileBtn" class="btn-outline btn" style="width: 100%; font-size: 0.85rem;">
            <i class="fas fa-pencil-alt"></i> EDIT PROFILE
          </button>
        </div>

        <!-- Profile Edit Form (hidden by default) -->
        <div id="profileEditMode" style="display: none;">
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px;">
            <input type="text" id="editFullname" value="${currentUser.fullname}" placeholder="Full Name"
              style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.07); border: 1px solid var(--glass-border); color: #fff; font-size: 0.9rem; box-sizing: border-box;">
            <input type="email" id="editEmail" value="${currentUser.email || ''}" placeholder="Email Address"
              style="width: 100%; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.07); border: 1px solid var(--glass-border); color: #fff; font-size: 0.9rem; box-sizing: border-box;">
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="saveProfileBtn" class="btn" style="flex: 1; font-size: 0.85rem; padding: 12px;">SAVE</button>
            <button id="cancelEditProfileBtn" class="btn-outline btn" style="flex: 1; font-size: 0.85rem; padding: 12px;">CANCEL</button>
          </div>
          <div id="profileSaveStatus" style="margin-top: 10px; font-size: 0.8rem; text-align: center;"></div>
        </div>
      </div>

      <!-- MY ORDERS CARD -->
      <div class="admin-section" style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid var(--glass-border);">
        <h3 style="color: var(--accent-gold); margin-bottom: 20px;"><i class="fas fa-shopping-bag"></i> My Orders</h3>
        <ul style="list-style: none; padding: 0;">
          ${currentUser.orders?.map(o => `<li style="padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 8px; font-size: 0.9rem;">${o}</li>`).join('') || '<li style="color: #666;">No orders found</li>'}
        </ul>
      </div>

      <!-- PURCHASE HISTORY CARD -->
      <div class="admin-section" style="background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid var(--glass-border);">
        <h3 style="color: var(--accent-gold); margin-bottom: 20px;"><i class="fas fa-history"></i> Purchase History</h3>
        <ul style="list-style: none; padding: 0;">
          ${currentUser.purchaseHistory?.map(item => `<li style="padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 8px; font-size: 0.9rem;">${item}</li>`).join('') || '<li style="color: #666;">No purchase history yet</li>'}
        </ul>
      </div>
    `;
  }

  dashboardHTML += `
      </div>
    </div>
  `;
  
  dashboardDiv.innerHTML = dashboardHTML;
  attachDashboardEvents();
  
  // Hide other sections
  document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
}

function attachDashboardEvents() {
  document.getElementById('dashboardLogoutBtn')?.addEventListener('click', logout);
  
  document.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      if (confirm("Permanently delete this user?")) {
        users = users.filter(u => u.id !== id);
        saveUsers();
        renderDashboard();
      }
    });
  });
  
  document.getElementById('syncInventoryBtn')?.addEventListener('click', () => {
    const status = document.getElementById('syncStatus');
    status.innerHTML = '<span style="color: var(--accent-gold);">⚡ Connecting to Warehouse...</span>';
    setTimeout(() => {
      status.innerHTML = '<span style="color: var(--accent-green);">✔ Inventory Synchronized!</span>';
      setTimeout(() => status.innerHTML = '', 3000);
    }, 1500);
  });

  document.getElementById('editProfileBtn')?.addEventListener('click', () => {
    document.getElementById('profileViewMode')?.classList.add('hidden');
    document.getElementById('profileEditMode')?.style.setProperty('display', 'block');
    document.getElementById('profileSaveStatus').textContent = '';
  });

  document.getElementById('cancelEditProfileBtn')?.addEventListener('click', () => {
    document.getElementById('profileEditMode')?.style.setProperty('display', 'none');
    document.getElementById('profileViewMode')?.classList.remove('hidden');
    document.getElementById('profileSaveStatus').textContent = '';
  });

  document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
    const newFullname = document.getElementById('editFullname')?.value.trim();
    const newEmail = document.getElementById('editEmail')?.value.trim();
    const statusEl = document.getElementById('profileSaveStatus');
    if (!newFullname) {
      statusEl.textContent = 'Please enter your name.';
      statusEl.style.color = '#ff6b6b';
      return;
    }

    currentUser.fullname = newFullname;
    currentUser.email = newEmail;
    saveCurrentUser();
    statusEl.textContent = 'Profile updated successfully!';
    statusEl.style.color = '#7ef2a4';
    setTimeout(() => {
      renderDashboard();
    }, 500);
  });
}

// ---------- UI LOGIC ----------

function renderProducts(filterBrand = 'All') {
  const grid = document.getElementById('partsGrid');
  if (!grid) return;

  const filtered = filterBrand === 'All'
    ? products
    : products.filter(p => p.brand === filterBrand);

  grid.innerHTML = filtered.map(p => `
    <div class="card">
      <span class="brand-badge">${p.brand}</span>
      <img src="${p.img}" alt="${p.name}" class="card-img">
      <h3>${p.name}</h3>
      <p style="color: #888; font-size: 0.85rem; margin-bottom: 8px;">${p.category}</p>
      <p class="price">₱${p.price.toLocaleString()}</p>
      <button class="btn part-order" data-part="${p.name}">Add to Cart</button>
    </div>
  `).join('');
}

function setupFilters() {
  const filterBar = document.getElementById('filterBar');
  if (!filterBar) return;

  const brands = ['All', ...new Set(products.map(p => p.brand))];
  filterBar.innerHTML = brands.map(b => `
    <button class="filter-btn ${b === 'All' ? 'active' : ''}" data-brand="${b}">${b}</button>
  `).join('');

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

// ---------- MODAL & NAV LOGIC ----------

const modal = document.getElementById('authModal');
function openModal() {
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  document.getElementById('loginTabBtn')?.classList.add('active');
  document.getElementById('signupTabBtn')?.classList.remove('active');
  document.getElementById('loginFormPanel')?.classList.remove('hidden');
  document.getElementById('signupFormPanel')?.classList.add('hidden');
}
function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  modal.style.display = 'none';
}

// ---------- KEY FIX: Auth button uses event delegation, bound ONCE ----------
// Using a single delegated listener on document prevents the listener
// from being lost when innerHTML is updated.

function setupAuthHandlers() {
  // Single delegated click on the login button — checked by ID
  document.addEventListener('click', (e) => {
    // Login / Logout button
    if (e.target.closest('#openLoginBtn')) {
      e.preventDefault();
      if (currentUser) {
        if (confirm(`Logout from ${currentUser.username}?`)) logout();
      } else {
        openModal();
      }
      return;
    }

    // Close modal via X button
    if (e.target.closest('#closeModalBtn')) {
      closeModal();
      return;
    }

    // Profile button opens dashboard when logged in
    if (e.target.closest('#profileBtn')) {
      e.preventDefault();
      if (currentUser) {
        renderDashboard();
      } else {
        openModal();
      }
      return;
    }

    // Click outside modal content to close
    if (e.target === modal) {
      closeModal();
      return;
    }
  });

  // Tab switching
  document.getElementById('loginTabBtn')?.addEventListener('click', () => {
    document.getElementById('loginTabBtn').classList.add('active');
    document.getElementById('signupTabBtn').classList.remove('active');
    document.getElementById('loginFormPanel').classList.remove('hidden');
    document.getElementById('signupFormPanel').classList.add('hidden');
  });

  document.getElementById('signupTabBtn')?.addEventListener('click', () => {
    document.getElementById('signupTabBtn').classList.add('active');
    document.getElementById('loginTabBtn').classList.remove('active');
    document.getElementById('signupFormPanel').classList.remove('hidden');
    document.getElementById('loginFormPanel').classList.add('hidden');
  });

  // Login submit
  document.getElementById('doLoginBtn')?.addEventListener('click', () => {
    const u = document.getElementById('loginUsername').value.trim();
    const p = document.getElementById('loginPassword').value.trim();
    if (u && p) loginUser(u, p);
    else alert("Please enter both fields");
  });

  // Allow Enter key in login fields
  ['loginUsername', 'loginPassword'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('doLoginBtn').click();
    });
  });

  // Signup submit
  document.getElementById('doSignupBtn')?.addEventListener('click', () => {
    const f = document.getElementById('signupFullname').value.trim();
    const e = document.getElementById('signupEmail').value.trim();
    const u = document.getElementById('signupUsername').value.trim();
    const p = document.getElementById('signupPassword').value.trim();
    const r = document.getElementById('signupRole').value;
    if (f && u && p) signupUser(f, e, u, p, r);
    else alert("Please fill in required fields");
  });
}

// NAVIGATION ITEMS
function fixNavItems() {
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.nav);
    });
  });
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupFilters();
  showSection('home');
  startHeroSlider();
  setupAuthHandlers();
  fixNavItems();
  updateHeaderAuth();

  // Restore session if already logged in
  if (currentUser) {
    renderDashboard();
  }
});

// HERO SLIDER LOGIC
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

// SCROLL LOGIC
window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt && window.scrollY > 500) btt.classList.add('show');
  else if (btt) btt.classList.remove('show');
});

// CONTACT FORM LOGIC
document.getElementById('sendInquiryBtn')?.addEventListener('click', () => {
  const name = document.getElementById('contactName').value;
  if (!name) { alert("Please enter your name."); return; }
  document.getElementById('contactForm').classList.add('hidden');
  document.getElementById('contactSuccess').classList.remove('hidden');
});

function resetContactForm() {
  document.getElementById('contactForm')?.classList.remove('hidden');
  document.getElementById('contactSuccess')?.classList.add('hidden');
  if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
  if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
  if (document.getElementById('contactMessage')) document.getElementById('contactMessage').value = '';
}

// ORDER LOGIC
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
