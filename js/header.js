document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!header) return;

  /* =========================================================
     1. MATCH ACTIVE LINK
     ========================================================= */
  // Get current filename (e.g., "about.html"). Default to "index.html" if empty.
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  
  // Select all links in Desktop and Mobile navs
  const allLinks = document.querySelectorAll(".nav-link, .mobile-nav a, .locations-dropdown a");

  allLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    
    if (linkPath === currentPath) {
      link.classList.add("active");

      // Special Logic: If user is on a location page (e.g. br.html), 
      // highlight the parent "Locations" link in the main nav.
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
    const open = mobileNav.style.display === "block";
    mobileNav.style.display = open ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!open));
  });
});
