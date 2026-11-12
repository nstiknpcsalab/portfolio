/* =====================================================
   MKS PORTFOLIO - script.js (Vanilla JavaScript)
   ===================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js"); // lets CSS know JavaScript is running

  /* ---------- 1. Theme toggle (remembers choice) ---------- */
  var themeBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) { /* storage blocked: ignore */ }
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
  });

  /* ---------- 2. Mobile menu ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function setMenu(open) {
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  navToggle.addEventListener("click", function () {
    setMenu(!navMenu.classList.contains("open"));
  });
  navMenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false); // close after tapping a link
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- 3. Hide empty sections and unused links ---------- */
  // A section is hidden (with its menu link) when it has no cards/items.
  var contentSelector = ".card, .timeline-item, .contact-list li, .about-text p";
  document.querySelectorAll("main section.section").forEach(function (section) {
    if (!section.querySelector(contentSelector)) {
      section.hidden = true;
      var link = document.querySelector('.nav-link[href="#' + section.id + '"]');
      if (link && link.parentElement) link.parentElement.hidden = true;
    }
  });

  // Hide buttons whose link is still a "#" placeholder (demo / code links)
  document.querySelectorAll("a[data-link]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").trim();
    if (href === "" || href === "#") a.hidden = true;
  });

  /* ---------- 4. Image fallbacks (if a file is missing) ---------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    function useFallback() {
      var box = document.createElement("div");
      if (img.dataset.fallback === "initials") {
        box.className = "initials";
        box.textContent = "MKS";
        box.setAttribute("role", "img");
        box.setAttribute("aria-label", img.alt);
      } else {
        box.className = "placeholder";
        box.textContent = img.dataset.title || "Project";
        box.setAttribute("role", "img");
        box.setAttribute("aria-label", img.alt);
      }
      img.replaceWith(box);
    }
    img.addEventListener("error", useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  });

  /* ---------- 5. Hide Resume button if resume.pdf is not uploaded yet ---------- */
  var resumeBtn = document.getElementById("resumeBtn");
  if (resumeBtn && location.protocol.indexOf("http") === 0) {
    fetch(resumeBtn.getAttribute("href"), { method: "HEAD" })
      .then(function (r) { if (!r.ok) resumeBtn.hidden = true; })
      .catch(function () { /* network problem: keep the button */ });
  }

  /* ---------- 6. Active menu link while scrolling ---------- */
  var links = document.querySelectorAll(".nav-link");
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 7. Scroll-reveal animation ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 8. Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
