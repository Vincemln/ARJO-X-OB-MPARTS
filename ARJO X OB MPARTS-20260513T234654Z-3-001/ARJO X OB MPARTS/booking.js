// booking.js - Unified Flow Logic

let currentSelection = JSON.parse(localStorage.getItem('lastSelection')) || { name: "No Item Selected", price: 0, type: "Service" };

// UI Elements
const panels = [document.getElementById('panel1'), document.getElementById('panel2'), document.getElementById('panelSuccess')];
const steps = [document.getElementById('step1'), document.getElementById('step2')];

function updateUI() {
  // Summary Step
  document.getElementById('summaryContent').innerHTML = `
    <h3 style="margin-bottom: 10px; color: var(--accent-gold);">${currentSelection.name}</h3>
    <p style="color: var(--text-secondary);">${currentSelection.type === 'Service' ? 'Workshop Service' : 'Performance Part'}</p>
  `;
  document.getElementById('totalAmount').innerText = `₱${(currentSelection.price || 0).toLocaleString()}`;
}

function nextStep(n) {
  panels.forEach(p => p.classList.remove('active'));
  document.getElementById(`panel${n}`).classList.add('active');

  steps.forEach((s, idx) => {
    s.classList.toggle('active', idx === n - 1);
    s.classList.toggle('completed', idx < n - 1);
  });
}

function prevStep(n) {
  panels.forEach(p => p.classList.remove('active'));
  document.getElementById(`panel${n}`).classList.add('active');

  steps.forEach((s, idx) => {
    s.classList.toggle('active', idx === n - 1);
  });
}

// Payment Logic
let selectedPaymentMethod = null;
function updatePaymentDetails() {
  const gcashPanel = document.getElementById('gcashDetails');
  const mayaPanel = document.getElementById('mayaDetails');
  const gcashAmountEl = document.getElementById('gcashAmount');
  const mayaAmountEl = document.getElementById('mayaAmount');
  const mobileInput = document.getElementById('mobileNumber');
  const mayaInput = document.getElementById('mayaIdentifier');
  const finishBtn = document.getElementById('finishBtn');

  gcashPanel.classList.add('hidden');
  mayaPanel.classList.add('hidden');

  if (selectedPaymentMethod === 'GCash') {
    gcashPanel.classList.remove('hidden');
    if (gcashAmountEl) gcashAmountEl.innerText = (currentSelection.price || 0).toLocaleString();
    if (mobileInput) mobileInput.value = mobileInput.value || '';
    updateFinishButtonState();
  } else if (selectedPaymentMethod === 'Maya') {
    mayaPanel.classList.remove('hidden');
    if (mayaAmountEl) mayaAmountEl.innerText = (currentSelection.price || 0).toLocaleString();
    if (mayaInput) mayaInput.value = mayaInput.value || '';
    updateFinishButtonState();
  } else {
    if (finishBtn) finishBtn.disabled = !selectedPaymentMethod;
  }
}

function selectPayment(el, method) {
  document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
  el.classList.add('selected');
  selectedPaymentMethod = method;
  updatePaymentDetails();
}

document.getElementById('finishBtn').addEventListener('click', () => {
  if (selectedPaymentMethod === 'GCash') {
    const mobileNumber = document.getElementById('mobileNumber')?.value.trim();
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('Please enter a valid mobile number to pay with GCash.');
      return;
    }
  }
  if (selectedPaymentMethod === 'Maya') {
    const mayaIdentifier = document.getElementById('mayaIdentifier')?.value.trim();
    if (!mayaIdentifier || mayaIdentifier.length < 5) {
      alert('Please enter your Maya mobile number or email.');
      return;
    }
  }

  document.getElementById('finishBtn').innerText = "Processing...";
  document.getElementById('finishBtn').disabled = true;

  setTimeout(() => {
    // SAVE BOOKING TO LOCALSTORAGE
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const newBooking = {
      id: 'BK-' + Date.now().toString().slice(-6),
      customerName: JSON.parse(localStorage.getItem('currentUser'))?.fullname || 'Guest',
      customerUsername: JSON.parse(localStorage.getItem('currentUser'))?.username || 'guest',
      item: currentSelection.name,
      type: currentSelection.type,
      price: currentSelection.price,
      paymentMethod: selectedPaymentMethod,
      paymentId: selectedPaymentMethod === 'GCash' ? document.getElementById('mobileNumber')?.value : document.getElementById('mayaIdentifier')?.value,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    panels.forEach(p => p.classList.remove('active'));
    document.getElementById('panelSuccess').classList.add('active');
  }, 2000);
});

function updateFinishButtonState() {
  const finishBtn = document.getElementById('finishBtn');
  if (!finishBtn) return;
  if (!selectedPaymentMethod) {
    finishBtn.disabled = true;
    return;
  }
  if (selectedPaymentMethod === 'GCash') {
    const mobileValid = document.getElementById('mobileNumber')?.value.trim().length >= 10;
    finishBtn.disabled = !mobileValid;
  } else if (selectedPaymentMethod === 'Maya') {
    const mayaValid = document.getElementById('mayaIdentifier')?.value.trim().length >= 5;
    finishBtn.disabled = !mayaValid;
  } else {
    finishBtn.disabled = false;
  }
}

function initPaymentInputs() {
  const mobileInput = document.getElementById('mobileNumber');
  if (mobileInput) {
    mobileInput.addEventListener('input', () => {
      updateFinishButtonState();
    });
  }

  const gcashNextBtn = document.getElementById('gcashNextBtn');
  if (gcashNextBtn) {
    gcashNextBtn.addEventListener('click', () => {
      if (selectedPaymentMethod !== 'GCash') return;
      const mobile = document.getElementById('mobileNumber')?.value.trim();
      if (!mobile || mobile.length < 10) {
        alert('Please enter a valid mobile number to proceed with GCash.');
        return;
      }
      document.getElementById('finishBtn').click();
    });
  }

  const mayaNextBtn = document.getElementById('mayaNextBtn');
  if (mayaNextBtn) {
    mayaNextBtn.addEventListener('click', () => {
      if (selectedPaymentMethod !== 'Maya') return;
      const mayaIdentifier = document.getElementById('mayaIdentifier')?.value.trim();
      if (!mayaIdentifier || mayaIdentifier.length < 5) {
        alert('Please enter a valid Maya number or email.');
        return;
      }
      document.getElementById('finishBtn').click();
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateUI();
  initPaymentInputs();
});
