// document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!toggle || !navList) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", !expanded);
    navList.style.display = expanded ? "none" : "flex";
    navList.style.flexDirection = "column";
    navList.style.gap = "20px";
  });
});
Header shrink logic placeholder (Step 2)
