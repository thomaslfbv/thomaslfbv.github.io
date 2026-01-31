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