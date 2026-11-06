// Small interaction layer for the static presentation prototype.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const portalModal = document.getElementById('portalModal');
const portalButton = document.getElementById('portalButton');
const closePortal = document.getElementById('closePortal');
const portalDashboard = document.getElementById('portalDashboard');

// Mobile navigation opens and closes from the menu button.
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

// Close mobile navigation after a visitor chooses a section.
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

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


// Interactive portal tour: all records below are fictional demonstration data.
const demoPortals = {
  parent: {
    title: 'Parent / Guardian Dashboard',
    intro: 'A parent could review a child’s school information from one place.',
    tiles: [['Attendance','View weekly attendance summary'],['Notices','Read school announcements'],['Fees','Review fee statements (demo only)'],['Progress','View academic and Qur’an learning updates']],
    actions: ['View attendance','Read latest notice','Open fee statement']
  },
  student: {
    title: 'Student Learning Dashboard',
    intro: 'A learner could access class information and learning activities.',
    tiles: [['Timetable','Today’s sample lesson schedule'],['Assignments','Tasks shared by teachers'],['Results','Term assessment preview'],['Qur’an learning','Memorisation and revision tracker']],
    actions: ['Open timetable','View assignments','Check progress']
  },
  teacher: {
    title: 'Teacher / Staff Workspace',
    intro: 'A staff workspace could support classroom and academic responsibilities.',
    tiles: [['My classes','Assigned classes and subjects'],['Attendance','Record daily class attendance'],['Assessments','Enter marks and feedback'],['Lesson planning','Prepare lesson notes and resources']],
    actions: ['Open class register','Prepare lesson note','View class list']
  },
  admin: {
    title: 'School Administration Dashboard',
    intro: 'An administrative overview for authorised management personnel.',
    tiles: [['Learners','Admissions and student profiles'],['Staff','Staff directory and roles'],['Finance','Fee collection and reports'],['Operations','Calendar, notices and school records']],
    actions: ['Review admissions','Create announcement','View school report']
  }
};

// Render the selected role's sample dashboard without connecting to real school data.
document.querySelectorAll('[data-role]').forEach((button) => {
  button.addEventListener('click', () => {
    const data = demoPortals[button.dataset.role];
    if (!data || !portalDashboard) return;
    document.querySelectorAll('[data-role]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    portalDashboard.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.intro}</p>
      <div class="demo-tiles">${data.tiles.map(([title, detail]) => `<div><strong>${title}</strong><small>${detail}</small></div>`).join('')}</div>
      <div class="demo-actions">${data.actions.map((action) => `<button class="demo-action" type="button">${action}</button>`).join('')}</div>
      <p class="demo-action-feedback" role="status">Choose a sample action to see how this area could respond.</p>
    `;
    portalDashboard.querySelectorAll('.demo-action').forEach((action) => {
      action.addEventListener('click', () => {
        portalDashboard.querySelector('.demo-action-feedback').textContent =
          action.textContent + ' — demonstration only. A production version would require authorised accounts and connected school records.';
      });
    });
  });
});
