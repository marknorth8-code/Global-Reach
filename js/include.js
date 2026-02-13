<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Site</title>
</head>
<body>

    <div id="header"></div>
    <main>
        <h1>Welcome to the Site</h1>
        <p>This content is always visible.</p>
    </main>
    <div id="footer"></div>

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
            if (!response.ok) throw new Error(`Failed to load ${item.file}: ${response.status}`);
            return response.text();
          })
          .then(html => {
            el.innerHTML = html;

            // If this is the header, run header.js initialization
            if (item.id === "header") {
              initHeader();
            }
            
            // Check for existing consent once the footer (which contains the banner) is loaded
            if (item.id === "footer") {
                checkInitialConsent();
            }
          })
          .catch(err => console.error(err));
      });

      return Promise.all(loadPromises);
    }

    // ================= HEADER.JS LOGIC =================
    function initHeader() {
      const header = document.querySelector(".site-header");
      const toggle = document.querySelector(".nav-toggle");
      const mobileNav = document.querySelector(".mobile-nav");

      if (!header) return;

      // Shrink on scroll
      window.addEventListener("scroll", () => {
        header.classList.toggle("is-shrunk", window.scrollY > 80);
      });

      // Mobile menu toggle
      toggle?.addEventListener("click", () => {
        const open = mobileNav.style.display === "block";
        mobileNav.style.display = open ? "none" : "block";
        toggle.setAttribute("aria-expanded", String(!open));
      });
    }

    // ================= COOKIE LOGIC (GLOBAL SCOPE) =================
    // 1. Function to show/hide the banner
    function toggleCookieBanner(show) {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
          banner.style.display = show ? 'block' : 'none';
      }
    }

    // 2. Function for your footer link: "Cookie Settings"
    function openCookieSettings() {
      toggleCookieBanner(true);
    }

    // 3. Handle user choice
    function setConsent(consented) {
      localStorage.setItem('cookie-consent', consented ? 'accepted' : 'declined');
      toggleCookieBanner(false);
      if (consented) {
        console.log("Cookies accepted. Load analytics here.");
        // Insert 
