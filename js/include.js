async function loadPartial(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Update paths for root-level pages
  loadPartial("#header", "partials/header.html");
  loadPartial("#footer", "partials/footer.html");
});
