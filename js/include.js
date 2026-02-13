<script>
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

        if (item.id === "header") {
          initHeader();
        }

        if (item.id === "footer") {
          checkInitialConsent();
        }
      })
      .catch(err => console.error(err));
  });

  return Promise.all(loadPromises);
}


// ================= HEADER LOGIC =================
function initHeader() {

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!header) return;

  /* ========================================
     1. ACTIVE LINK MATCHING
     ======================================== */
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  const allLinks = document.querySelectorAll(
    ".nav-link, .mobile-nav a, .locations-dropdown a"
  );

  allLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (!linkPath) return;

    if (linkPath === currentPath) {
      link.classList.add("active");

      const dropdown = link.closest(".locations-dropdown");
      if (dropdown) {
        const parentLink = dropdown.parentElement.querySelector(".nav-link");
        if (parentLink) parentLink.classList.add("active");
      }
    }
  });


  /* ========================================
     2. SHRINK ON SCROLL
     ======================================== */
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
  });


  /* ========================================
     3. MOBILE MENU
     ======================================== */
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}


// ================= COOKIE LOGIC =================

function toggleCookieBanner(show) {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = show ? 'block' : 'none';
  }
}

function openCookieSettings() {
  toggleCookieBanner(true);
}

function setConsent(consented) {
  localStorage.setItem('cookie-consent', consented ? 'accepted' : 'declined');
  toggleCookieBanner(false);

  if (consented) {
    console.log("Cookies accepted. Load analytics here.");
  }
}

function checkInitialConsent() {
  const savedConsent = localStorage.getItem('cookie-consent');
  if (!savedConsent) {
    toggleCookieBanner(true);
  }
}


// Start everything after DOM loads
document.addEventListener("DOMContentLoaded", includeHTML);

</script>
