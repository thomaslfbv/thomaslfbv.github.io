document.documentElement.classList.add("js-enabled");
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

  matchMedia("(min-width: 921px)").addEventListener("change", closeMenu);
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
    if (e.key === "Escape" && header.classList.contains("is-open")) { closeMenu(); burger.focus(); }
  });

  document.addEventListener("click", (e) => {
    const isOpen = header.classList.contains("is-open");
    if (!isOpen) return;

    const clickInsideHeader = header.contains(e.target);
    if (!clickInsideHeader) closeMenu();
  });
})();


// Project links remain usable when JavaScript is unavailable.
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTechs = document.getElementById('modalTechs');
const modalLink = document.getElementById('modalLink');
if (typeof modal.showModal === 'function') {
  document.querySelectorAll('.card[data-title]').forEach(card => {
    card.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalLink.href = card.dataset.link;
      modalTechs.replaceChildren(...card.dataset.tech.split(',').map(tech => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tech.trim();
        return tag;
      }));
      card.querySelector('.project-trigger').focus();
      modal.showModal();
    });
  });
  document.getElementById('closeModal').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    const bounds = modal.getBoundingClientRect();
    if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
  });
}

// Follow the section passing below the sticky header, including the page bottom.
(() => {
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const header = document.querySelector('.site-header');
  let scheduled = false;
  function updateActiveSection() {
    scheduled = false;
    const threshold = header.getBoundingClientRect().height + 32;
    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= threshold) active = index;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) active = sections.length - 1;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateActiveSection); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  updateActiveSection();
})();

// Type "hub" to return to the landing page; keep only a temporary prefix.
(() => {
  let prefix = '';
  let lastKeyTime = 0;
  document.addEventListener('keydown', event => {
    const editing = event.target instanceof Element &&
      event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]');
    if (event.defaultPrevented || event.isComposing || event.repeat ||
        event.ctrlKey || event.metaKey || event.altKey || editing) {
      prefix = '';
      return;
    }
    if (event.key.length !== 1) {
      prefix = '';
      return;
    }
    const now = performance.now();
    if (now - lastKeyTime > 2000) prefix = '';
    lastKeyTime = now;
    const key = event.key.toLowerCase();
    prefix += key;
    if (!'hub'.startsWith(prefix)) prefix = key === 'h' ? 'h' : '';
    if (prefix === 'hub') {
      prefix = '';
      window.location.assign('../index.html');
    }
  });
  window.addEventListener('blur', () => { prefix = ''; });
})();
