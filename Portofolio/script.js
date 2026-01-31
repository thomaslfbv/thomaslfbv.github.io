(function () {
  const header = document.querySelector(".site-header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("siteNav");
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    const isLight = theme === "light";
    if (themeLabel) themeLabel.textContent = isLight ? "Clair" : "Sombre";

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Basculer en mode sombre" : "Basculer en mode clair"
      );
    }

    try {
      localStorage.setItem("theme", theme);
    } catch (_) {}
  }

  function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem("theme");
    } catch (_) {}

    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    } else {
      setTheme("dark");
    }
  }

  function openMenu() {
    header.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fermer le menu");
  }

  function closeMenu() {
    header.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }

  function toggleMenu() {
    const isOpen = header.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  }

  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  if (burger) {
    burger.addEventListener("click", toggleMenu);
  }

  if (nav) {
    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.matches && target.matches('a[href^="#"]')) {
        closeMenu();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (e) => {
    const isOpen = header.classList.contains("is-open");
    if (!isOpen) return;

    const clickInsideHeader = header.contains(e.target);
    if (!clickInsideHeader) closeMenu();
  });
})();


/* --- GESTION DES MODALES --- */

// Sélection des éléments
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTechs = document.getElementById('modalTechs');
const modalLink = document.getElementById('modalLink');
const closeBtn = document.getElementById('closeModal');
const overlay = document.getElementById('modalOverlay');
const cards = document.querySelectorAll('.card');

// Fonction pour ouvrir la modal avec les infos du projet
cards.forEach(card => {
  card.addEventListener('click', () => {
    // 1. Récupérer les données de la carte cliquée
    const title = card.getAttribute('data-title');
    const desc = card.getAttribute('data-desc');
    const link = card.getAttribute('data-link');
    const techs = card.getAttribute('data-tech').split(','); // Transforme "HTML,CSS" en tableau

    // 2. Remplir la modal
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalLink.href = link;

    // Générer les badges technos
    modalTechs.innerHTML = techs.map(tech => 
      `<span class="tag">${tech}</span>`
    ).join('');

    // 3. Afficher la modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Empêche le scroll derrière
  });
});

// Fonction pour fermer la modal
function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = ''; // Réactive le scroll
}

// Écouteurs pour fermer (bouton X ou clic en dehors)
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Fermer avec la touche Echap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});