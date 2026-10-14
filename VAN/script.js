'use strict';

// Navigation remains available without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
document.documentElement.classList.add('js-menu');
function setMenu(open, restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  navigation.classList.toggle('is-open', open);
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.header')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
matchMedia('(min-width: 701px)').addEventListener('change', () => setMenu(false));

// Native dialog provides focus containment, Escape, and focus restoration.
const galleryLinks = [...document.querySelectorAll('[data-photo]')];
const dialog = document.querySelector('.lightbox');
const photo = dialog.querySelector('.lightbox-image');
const counter = dialog.querySelector('[data-counter]');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[currentPhoto];
  photo.src = link.href;
  photo.alt = link.querySelector('img').alt;
  counter.textContent = `${currentPhoto + 1} / ${galleryLinks.length} — ${link.querySelector('b').textContent}`;
}
if (typeof dialog.showModal === 'function') {
  galleryLinks.forEach((link, index) => link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showPhoto(index);
    dialog.showModal();
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-prev]').addEventListener('click', () => showPhoto(currentPhoto - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => showPhoto(currentPhoto + 1));
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
}

// Load the neighborhood once, when its FAQ answer is opened.
const pickupDetails = document.querySelector('#lieu-depart');
const mapSurface = document.querySelector('#pickup-map');
function loadPickupMap() {
  if (!pickupDetails.open || mapSurface.querySelector('iframe')) return;
  const frame = document.createElement('iframe');
  frame.title = 'Google Maps — quartier de la Monnaie à Paris, zone indicative';
  frame.src = 'https://www.google.com/maps?q=Quartier%20de%20la%20Monnaie%2C%20Paris&z=14&output=embed';
  frame.referrerPolicy = 'no-referrer';
  mapSurface.append(frame);
}
if (pickupDetails && mapSurface) {
  pickupDetails.addEventListener('toggle', loadPickupMap);
  const openPickupFromHash = () => {
    if (location.hash === '#lieu-depart') {
      pickupDetails.open = true;
      loadPickupMap();
    }
  };
  window.addEventListener('hashchange', openPickupFromHash);
  openPickupFromHash();
}
