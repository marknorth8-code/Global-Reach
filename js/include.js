// ================= INCLUDE.JS =================
function includeHTML() {
  const includes = [
    { id: "header", file: "./partials/header.html" },
    { id: "footer", file: "./partials/footer.html" }
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

  // --- START: Active Link Highlighting Logic ---
  // 1. Get current filename (e.g., "about.html"). 
  let currentPath = window.location.pathname.split("/").pop();
  if (currentPath === "" || currentPath === "/") currentPath = "index.html";
  
  // 2. Select all navigation links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav a, .locations-dropdown a");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    
    // 3. Check if link matches current page
    if (linkPath === currentPath) {
      // Add both classes to be safe, and the ARIA attribute for accessibility
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
      
      // 4. If the link is inside a dropdown (e.g., Brazil page), 
      // highlight the parent "Offices" button too
      const parentDropdown = link.closest('.has-dropdown');
      if (parentDropdown) {
        const parentBtn = parentDropdown.querySelector('.nav-link');
        if (parentBtn) parentBtn.classList.add('active');
      }
    }
  });
  // --- END: Active Link Highlighting Logic ---

  // Scroll effect
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 80);
  });

  // Mobile Toggle Fix
  toggle?.addEventListener("click", () => {
    const isVisible = mobileNav.style.display === "block";
    mobileNav.style.display = isVisible ? "none" : "block";
    toggle.setAttribute("aria-expanded", String(!isVisible));
  });
}


// Run when page loads
document.addEventListener("DOMContentLoaded", includeHTML);
