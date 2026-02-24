/**
 * Global Reach - include.js
 * Handles Header/Footer injection and Dynamic Property Grids
 */

function includeHTML() {
  const includes = [
    { id: "header", file: "partials/header.html" }, // Use absolute paths if possible
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
      .catch(err => console.error("Include error:", err));
  });

  // Once layout is ready, load the properties
  return Promise.all(loadPromises).then(() => {
    initDynamicGrid();
  });
}

/**
 * DYNAMIC GRID LOADER
 * Detects location from URL and fetches corresponding JSON data
 */
function initDynamicGrid() {
  const gridContainer = document.getElementById("opportunities-grid");
  if (!gridContainer) return;

  // 1. Detect location from URL path or filename
  const urlPath = window.location.pathname.toLowerCase();
  let jsonFile = "";

  if (urlPath.includes("/br/") || urlPath.includes("brazil")) {
    jsonFile = "br";
  } else if (urlPath.includes("/jp/") || urlPath.includes("japan")) {
    jsonFile = "jp";
  } else if (urlPath.includes("/nz/") || urlPath.includes("new-zealand")) {
    jsonFile = "nz";
  } else if (urlPath.includes("/uk/") || urlPath.includes("uk")) {
    jsonFile = "uk";
  }

  if (!jsonFile) {
    console.warn("Could not determine location from URL for data fetching.");
    return;
  }

  // 2. Fetch the JSON data
  // Using path starting with '/' ensures it works from subfolders
   const jsonPath = `data/${jsonFile}-data.json`;

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error(`Data file not found at ${jsonPath}`);
      return response.json();
    })
    .then(data => {
      const cardsHtml = data.map(prop => `
        <article class="property-card">
          <div class="property-image-container">
             <img src="/${prop.image}" alt="${prop.title}" loading="lazy" 
                  onerror="this.src='https://via.placeholder.com'">
             <div class="property-overlay">
                <h3 class="sharp-text">${prop.title}</h3>
             </div>
          </div>
          <div class="property-info">
             <p class="prop-detail"><strong>${prop.line1}</strong></p>
             <p class="prop-detail">${prop.line2}</p>
             <p class="prop-detail">${prop.line3}</p>
             <div style="margin-top:15px;">
               <a href="/${prop.link}" class="btn-small">View Details</a>
             </div>
          </div>
        </article>
      `).join("");

      gridContainer.innerHTML = cardsHtml;
    })
    .catch(err => {
      gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center;">Currently updating opportunities. Please contact us for details.</p>`;
      console.warn("Dynamic grid skipped:", err.message);
    });
}

/**
 * HEADER NAVIGATION LOGIC
 * Handles active states and mobile toggle
 */
function initHeader() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!header) return;

  // Set Active Link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && currentPath.includes(href) && href !== "/") {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Sticky Header on scroll
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-shrunk", window.scrollY > 50);
  });

  // Mobile Menu Toggle
  toggle?.addEventListener("click", () => {
    const isVisible = mobileNav.style.display === "flex" || mobileNav.classList.contains("open");
    mobileNav.style.display = isVisible ? "none" : "flex";
    toggle.setAttribute("aria-expanded", String(!isVisible));
  });
}

// Initial Run
document.addEventListener("DOMContentLoaded", includeHTML);
