/* ============================================================================
   Markdown Web Clipper — home.js
   Production version of the design-handoff landing.js. Two jobs:

     1. Before/after fidelity toggle (rendered ⇄ source) on the home page.
     2. Tiny "feels alive" interactions on the live HTML popup recreation in
        the hero — tab clicks and the Auto/Full/Selection segmented control
        flip the .active class so the section reads as a real UI, not a
        flat image.

   What was stripped vs the design bundle:
     - Tweaks dev overlay (#tweaks) + its state/persistence/reflect handlers
       — production strips the panel; HTML carries the locked defaults on
       <html> (data-hero / data-density / data-accent / data-pro).
     - Theme persistence: production respects prefers-color-scheme via CSS
       @media query in tokens.css. Add a header toggle here in a follow-up
       if/when the user wants a manual override.

   No framework. ~30 LOC. Safe to load on pages that don't have a #fidelity
   block or a .popup demo — the querySelectors no-op silently.
   ============================================================================ */
(function () {
  "use strict";

  // Before/after fidelity toggle. The button's data-ba-mode is mirrored
  // onto the section's [data-ba] attribute; CSS shows/hides .ba-show-*
  // children based on that.
  document.querySelectorAll("[data-ba] .ba-toggle").forEach(function (tg) {
    var sect = tg.closest("[data-ba]");
    tg.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      sect.setAttribute("data-ba", btn.getAttribute("data-ba-mode"));
      tg.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
    });
  });

  // Popup demo — tabs (Clip / Edit / Settings) + segmented control
  // (Auto / Full Page / Selection). Click the active class around so
  // the hero popup reads as live UI rather than a static screenshot.
  document.querySelectorAll(".popup-tabs").forEach(function (tabs) {
    tabs.addEventListener("click", function (e) {
      var t = e.target.closest(".popup-tab");
      if (!t) return;
      tabs.querySelectorAll(".popup-tab").forEach(function (x) {
        x.classList.toggle("active", x === t);
      });
    });
  });
  document.querySelectorAll(".popup .seg").forEach(function (seg) {
    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      seg.querySelectorAll("button").forEach(function (x) {
        x.classList.toggle("active", x === b);
      });
    });
  });
})();
