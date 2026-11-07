// Small interaction layer for the static presentation prototype.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const portalModal = document.getElementById('portalModal');
const portalButton = document.getElementById('portalButton');
const closePortal = document.getElementById('closePortal');
const portalDashboard = document.getElementById('portalDashboard');

// Mobile navigation: use a guarded click handler so the menu works on touchscreens.
if (menuToggle && mainNav) {
  menuToggle.type = 'button';
  menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = !mainNav.classList.contains('open');
    mainNav.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
}

// Close mobile navigation after a visitor chooses a section.
if (mainNav && menuToggle) {
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

// The portal is a visual concept only; it does not authenticate users.
function openPortalPreview() {
  portalModal.classList.add('open');
  portalModal.setAttribute('aria-hidden', 'false');
  closePortal.focus();
}

function closePortalPreview() {
  portalModal.classList.remove('open');
  portalModal.setAttribute('aria-hidden', 'true');
  portalButton.focus();
}

portalButton.addEventListener('click', openPortalPreview);
closePortal.addEventListener('click', closePortalPreview);
portalModal.addEventListener('click', (event) => {
  if (event.target === portalModal) closePortalPreview();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && portalModal.classList.contains('open')) {
    closePortalPreview();
  }
});

// Validate the demonstration form without sending or saving personal data.
document.getElementById('enquiryForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('parentName').value.trim();
  const level = document.getElementById('level').value;
  const feedback = document.getElementById('formFeedback');
  feedback.textContent = `Thank you, ${name}. This is a demonstration only; no enquiry has been sent. Selected level: ${level}.`;
});

// Keep the footer year current automatically.
document.getElementById('year').textContent = new Date().getFullYear();


// Interactive portal tour with fictional sample records only.
const demoPaymentRecords = [
  { admissionNo: 'AAZ-001', student: 'Amina Sample', className: 'Primary 4', amount: 45000, method: 'Bank transfer', reference: 'DEMO-TRX-001', date: '2026-10-15', status: 'Verified' }
];

// Keep the prototype role dashboards separate from real school accounts or records.
const demoPortals = {
  parent: {
    title: 'Parent / Guardian Dashboard',
    intro: 'A parent can review a learner’s sample school information.',
    tiles: [['Attendance','Weekly attendance summary'],['Notices','School announcements'],['Fee records','Verified payments and balances'],['Learning progress','Academic and Qur’an learning updates']]
  },
  student: {
    title: 'Student Dashboard',
    intro: 'Sample learner workspace. Use the example admission number AAZ-001 to preview a payment record.',
    tiles: [['Timetable','Today’s sample lesson schedule'],['Assignments','Tasks shared by teachers'],['Results','Term assessment preview'],['Qur’an learning','Memorisation and revision tracker']]
  },
  teacher: {
    title: 'Teacher / Staff Workspace',
    intro: 'A staff workspace for classroom and academic responsibilities.',
    tiles: [['My classes','Assigned classes and subjects'],['Attendance','Daily class attendance'],['Assessments','Marks and feedback'],['Lesson planning','Lesson notes and resources']]
  },
  admin: {
    title: 'School Administration Dashboard',
    intro: 'Authorised staff can record a payment after confirming that the school received it.',
    tiles: [['Learners','Admissions and student profiles'],['Staff','Staff directory and roles'],['Finance','Fee records and reports'],['Operations','Calendar, notices and school records']]
  }
};

function renderPaymentHistory(admissionNo) {
  const matches = demoPaymentRecords.filter((record) => record.admissionNo.toLowerCase() === admissionNo.toLowerCase());
  if (!matches.length) return '<p>No matching demonstration payment record was found. Check the admission number.</p>';
  return matches.map((record) => `
    <div class="payment-record">
      <div><strong>₦${Number(record.amount).toLocaleString('en-NG')}</strong><small>${record.date} · ${record.method}</small></div>
      <div><b>${record.student}</b><small>${record.className} · Ref: ${record.reference}</small></div>
      <span class="payment-status">${record.status}</span>
    </div>
  `).join('');
}

// Display the chosen role and provide role-specific sample actions.
document.querySelectorAll('[data-role]').forEach((button) => {
  button.addEventListener('click', () => {
    const role = button.dataset.role;
    const data = demoPortals[role];
    if (!data || !portalDashboard) return;
    document.querySelectorAll('[data-role]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const tiles = data.tiles.map(([title, detail]) =>
      `<div><strong>${title}</strong><small>${detail}</small></div>`).join('');

    if (role === 'admin') {
      portalDashboard.innerHTML = `
        <h3>${data.title}</h3><p>${data.intro}</p>
        <div class="demo-tiles">${tiles}</div>
        <h4 class="portal-subheading">Record a verified school-fee payment</h4>
        <p class="portal-hint">Enter a fictional sample record below. In the real system, only authorised finance staff should submit a payment after checking the bank deposit, transfer or cash receipt.</p>
        <form id="demoPaymentForm" class="demo-payment-form">
          <label>Student admission number<input name="admissionNo" required placeholder="e.g. AAZ-001"></label>
          <label>Student full name<input name="student" required placeholder="Student name"></label>
          <label>Class<input name="className" required placeholder="e.g. Primary 4"></label>
          <label>Amount received (₦)<input name="amount" type="number" min="1" required placeholder="45000"></label>
          <label>Payment method<select name="method" required><option value="">Select method</option><option>Bank transfer</option><option>Bank deposit</option><option>Cash</option><option>Other approved method</option></select></label>
          <label>Transaction / receipt reference<input name="reference" required placeholder="Bank reference or receipt number"></label>
          <label>Date received<input name="date" type="date" required></label>
          <label>Receipt evidence (optional)<input name="receipt" type="file" accept="image/*,.pdf"></label>
          <button class="demo-action" type="submit">Add sample payment record</button>
          <p class="demo-action-feedback" role="status">This prototype does not upload or store receipt files or send data to a server.</p>
        </form>
        <h4 class="portal-subheading">Recent sample payment records</h4>
        <div id="adminPaymentList">${renderPaymentHistory('AAZ-001')}</div>
      `;
      document.getElementById('demoPaymentForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const values = new FormData(form);
        const record = {
          admissionNo: String(values.get('admissionNo')).trim(),
          student: String(values.get('student')).trim(),
          className: String(values.get('className')).trim(),
          amount: Number(values.get('amount')),
          method: String(values.get('method')),
          reference: String(values.get('reference')).trim(),
          date: String(values.get('date')),
          status: 'Verified (demo)'
        };
        if (!record.amount || record.amount < 1) return;
        demoPaymentRecords.unshift(record);
        document.getElementById('adminPaymentList').innerHTML = renderPaymentHistory(record.admissionNo);
        form.querySelector('.demo-action-feedback').textContent =
          'Sample record added for this browser session. It is not stored in a school database.';
        form.reset();
      });
      return;
    }

    if (role === 'student' || role === 'parent') {
      portalDashboard.innerHTML = `
        <h3>${data.title}</h3><p>${data.intro}</p>
        <div class="demo-tiles">${tiles}</div>
        <h4 class="portal-subheading">School-fee payment history</h4>
        <form id="paymentLookupForm" class="demo-payment-form">
          <label>Student admission number<input name="admissionNo" required value="AAZ-001" placeholder="Enter admission number"></label>
          <button class="demo-action" type="submit">View payment records</button>
        </form>
        <div id="paymentLookupResults">${renderPaymentHistory('AAZ-001')}</div>
        <p class="portal-hint">Sample data only. A production portal would show records belonging only to the authenticated learner and their authorised parent/guardian.</p>
      `;
      document.getElementById('paymentLookupForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const admissionNo = new FormData(event.currentTarget).get('admissionNo').trim();
        document.getElementById('paymentLookupResults').innerHTML = renderPaymentHistory(admissionNo);
      });
      return;
    }

    portalDashboard.innerHTML = `
      <h3>${data.title}</h3><p>${data.intro}</p>
      <div class="demo-tiles">${tiles}</div>
      <p class="portal-hint">A production staff workspace would require individual accounts, assigned permissions and an audit trail.</p>
    `;
  });
});
