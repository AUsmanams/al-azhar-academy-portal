// Small interaction layer for the static presentation prototype.
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const portalModal = document.getElementById('portalModal');
const portalButton = document.getElementById('portalButton');
const closePortal = document.getElementById('closePortal');

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
