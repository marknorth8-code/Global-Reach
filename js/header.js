/* Listen for the custom event dispatched by include.js */
document.addEventListener("headerLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  // Now header will exist because this only runs AFTER the fetch completes
  if (!header) return;

  /* =========================================================
     1. MATCH ACTIVE LINK
     ========================================================= */
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const allLinks = document.querySelectorAll(".nav-link, .mobile-nav a, .locations-dropdown a");

  allLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
      const dropdown = link.closest(".locations-dropdown");
      if (dropdown) {
        const parentLink = dropdown.parentElement.querySelector(".nav-link");
        if (parentLink) parentLink.classList.add("active");
      }
    }
  });

  /* =========================================================
     2. SHRINK ON SCROLL
     ========================================================= */
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
  });

  /* =========================================================
     3. MOBILE TOGGLE
     ========================================================= */
  toggle?.addEventListener("click", () => {
    // Pro-tip: toggle a class instead of modifying inline styles for better control
    const isOpen = mobileNav.classList.toggle('is-open');
    mobileNav.style.display = isOpen ? "block" : "none";
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});
