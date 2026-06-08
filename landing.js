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
        var on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
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

  // Installed-detection. When the Markdown Web Clipper extension is installed,
  // every Chrome Web Store button on this site swaps to a "✓ Installed — Open
  // Clipper" state pointing at the in-product next-step section. When NOT
  // installed (or chrome.runtime isn't available, or detection throws), every
  // store button stays byte-for-byte the default store link — this safe default
  // is mandatory: nothing is touched unless the extension actually replies.
  //
  // chrome.runtime is injected on this origin only because the extension
  // declares externally_connectable for https://markdownwebclipper.com/* (see
  // wxt.config.ts). If that declaration is ever removed, this feature goes inert
  // and the buttons silently keep their default behavior (correct fallback).
  var CLIPPER_EXT_ID = "dpkinbemdemheacegfjbbkclcpbfedif";
  var STORE_SELECTOR =
    'a[href*="chromewebstore.google.com/detail/' + CLIPPER_EXT_ID + '"]';
  // A web page cannot open the extension popup (no API for that), so an installed
  // user's most useful action is leaving a review — point them at the CWS reviews
  // tab in a new tab. The selector below stops matching once href is rewritten.
  var REVIEW_TARGET =
    "https://chromewebstore.google.com/detail/markdown-web-clipper-save-pages-to-obsidian/" +
    CLIPPER_EXT_ID +
    "/reviews";

  // Standalone, idempotent. Only rewrites anchors still matching STORE_SELECTOR;
  // after a swap the href is REVIEW_TARGET (a /reviews URL — no longer matches the
  // detail-page selector), so a re-run no longer selects them.
  // Never touches className / styles — button CSS is preserved exactly.
  function swapStoreButtons(root) {
    var scope = root || document;
    var links = scope.querySelectorAll(STORE_SELECTOR);
    links.forEach(function (link) {
      link.textContent = "✓ Installed — leave a review ★";
      link.setAttribute("href", REVIEW_TARGET);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
    return links.length;
  }

  // Detection — swaps ONLY when the extension replies with no lastError.
  function detectInstalled() {
    if (
      typeof chrome === "undefined" ||
      !chrome.runtime ||
      typeof chrome.runtime.sendMessage !== "function"
    ) {
      return; // no chrome / not an extension-connected origin → leave untouched
    }
    try {
      chrome.runtime.sendMessage(CLIPPER_EXT_ID, { type: "PING" }, function () {
        // Read lastError FIRST so Chrome doesn't log an unchecked-error warning.
        if (chrome.runtime.lastError) {
          return; // not installed / unreachable → do nothing
        }
        // No lastError → INSTALLED. (The shipped extension replies to any
        // external message from markdownwebclipper.com, so a callback with no
        // lastError reliably means installed even before a PING handler ships.)
        swapStoreButtons(document);
      });
    } catch (e) {
      // Treat any throw as not-installed; leave buttons untouched.
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", detectInstalled);
  } else {
    detectInstalled();
  }

  // Test-only bridge (browser-safe, zero runtime cost): lets the unit test call
  // the REAL shipped swap function rather than a copy.
  if (typeof window !== "undefined") {
    window.__clipperDetect = { swapStoreButtons: swapStoreButtons };
  }
})();
