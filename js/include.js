// ================= INCLUDE.JS =================
function includeHTML() {
  const includes = [
    { id: "header", file: "partials/header.html" },
    { id: "footer", file: "partials/footer.html" }
  ];

  const loadPromises = includes.map(item => {
    const el = document.getElementById(item.id);
    if (!el) return Promise.resolve();

    return fetch(item.file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${item.file}`);
        return response.text();
      })
      .then(html => {
        el.innerHTML = html;

        if (item.id === "header") initHeader();
      })
      .catch(err => console.error(err));
  });

  return Promise.all(loadPromises);
}

// ================= HEADER INIT =================
function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
  });

  toggle?.addEventListener("click", () => {
    const open = mobileNav.style.display === "block";
    mobileNav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });
}

// Run when page loads
document.addEventListener("DOMContentLoaded", includeHTML);
