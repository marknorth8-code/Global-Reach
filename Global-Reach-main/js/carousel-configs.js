/**
 * Global carousel configuration registry
 * --------------------------------------
 * This file contains NO carousel logic.
 * It is read by carousel.js at runtime.
 *
 * Each key must match the carousel container ID in the HTML.
 */

window.CAROUSEL_CONFIGS = {

  /* ==========================================================
     HOME – LISTINGS CAROUSEL
     Infinite, slow, centre-focused selector
  ========================================================== */
  "carousel-listings": {
    type: "listings",
    autoplay: true,
    autoplaySpeed: 4000,
    loop: true,
    centerMode: true,
    scaleActive: true,
    imageRatio: "1:1",
    revealFullRatioOnActive: true,
    transition: "slow",
    arrows: false,
    dots: false,
    swipe: true
  },

  /* ==========================================================
     HOME – LOCATIONS CAROUSEL
     Navigational, 4 items only
  ========================================================== */
  "carousel-locations": {
    type: "locations",
    autoplay: false,
    loop: true,
    centerMode: false,
    imageRatio: "3:2",
    visibleDesktop: 1.5,
    visibleMobile: 1,
    transition: "medium",
    arrows: true,
    dots: false,
    swipe: true
  },

  /* ==========================================================
     HOME – SECTORS / SERVICES CAROUSEL
     Conceptual, visual, slow
  ========================================================== */
  "carousel-sectors": {
    type: "sectors",
    autoplay: true,
    autoplaySpeed: 5000,
    loop: true,
    centerMode: true,
    imageRatio: "1:1",
    transition: "slow",
    arrows: false,
    dots: false,
    swipe: true
  },

  /* ==========================================================
     ABOUT – WORK HISTORY CAROUSEL
     Fast, repeatable, up to 10 images
  ========================================================== */
  "carousel-history": {
    type: "history",
    autoplay: false,
    loop: true,
    centerMode: false,
    imageRatio: "3:2",
    visibleDesktop: 1.5,
    visibleMobile: 1,
    transition: "fast",
    arrows: true,
    dots: false,
    swipe: true
  },

  /* ==========================================================
     PROPERTY – GALLERY CAROUSEL
     User-controlled, no autoplay
  ========================================================== */
  "property-gallery-carousel": {
    type: "property-gallery",
    autoplay: false,
    loop: false,
    centerMode: true,
    imageRatio: "3:2",
    transition: "slow",
    arrows: true,
    dots: true,
    swipe: true,
    keyboard: true
  }

};
