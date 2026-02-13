/* =========================================================
   HEADER.JS
   Runs ONLY after header is injected by include.js
   ========================================================= */

document.addEventListener("headerLoaded", () => {

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!header) return;

  /* =========================================================
     1. MATCH ACTIVE LINK
     ========================================================= */

  function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    const allLinks = document.querySelectorAll(
      ".nav-link, .mobile-nav a, .locations-dropdown a"
    );

    allLinks.forEach(link => {
      const linkPath = link.getAttribute("href");
      if (!linkPath) return;

      // Remove any trailing slash for safety
      const cleanedLinkPath = linkPath.replace("/", "");

      if (cleanedLinkPath === currentPath) {
        link.classList.add("active");

        // If inside dropdown, activate parent too
        const dropdown = link.closest(".locations-dropdown");
        if (dropdown) {
          const parentLink = dropdown.parentElement.querySelector(".nav-link");
          if (parentLink) parentLink.classList.add("active");
        }
      }
    });
  }

  setActiveNavLink();


  /* =========================================================
     2. SHRINK HEADER ON SCROLL
     ========================================================= */

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
  });


  /* =========================================================
     3. MOBILE NAV TOGGLE
     ========================================================= */

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {

      const isOpen = mobileNav.classList.toggle("is-open");

      // Optional: only needed if you rely on display:block
      mobileNav.style.display = isOpen ? "block" : "none";

      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

});
