/* ============================================================
   CLÍNICA BIA FRANCHITO – main.js
   ============================================================ */

"use strict";

/* ============================================================
   SLIDESHOW DO VIDEO-CONTAINER
   ============================================================ */
function initSlideshow() {
  const scenes = document.querySelectorAll(".scene");
  const progressBar = document.getElementById("progress");
  const pauseBtn = document.getElementById("pause-btn");
  if (!scenes.length) return;

  let currentScene = 0;
  let isPlaying = true;
  let timer = null;
  let progressInterval = null;
  let totalTime = 0;
  let elapsedTime = 0;
  let sceneTimeLeft = 0;

  scenes.forEach((s) => {
    totalTime += parseInt(s.getAttribute("data-duration") || 5000, 10);
  });

  function playScene(index) {
    if (index >= scenes.length) {
      restartVideo();
      return;
    }
    scenes.forEach((s) => s.classList.remove("active"));
    scenes[index].classList.add("active");
    currentScene = index;
    sceneTimeLeft = parseInt(
      scenes[index].getAttribute("data-duration") || 5000,
      10,
    );
    if (isPlaying) {
      timer = setTimeout(() => playScene(index + 1), sceneTimeLeft);
    }
  }

  function startProgress() {
    const rate = 100;
    progressInterval = setInterval(() => {
      if (!isPlaying) return;
      elapsedTime += rate;
      const pct = Math.min((elapsedTime / totalTime) * 100, 100);
      if (progressBar) progressBar.style.width = pct + "%";
      if (elapsedTime >= totalTime) clearInterval(progressInterval);
    }, rate);
  }

  window.pausePlay = function () {
    if (isPlaying) {
      isPlaying = false;
      clearTimeout(timer);
      if (pauseBtn) pauseBtn.innerHTML = "▶";
    } else {
      isPlaying = true;
      if (pauseBtn) pauseBtn.innerHTML = "&#8741;";
      timer = setTimeout(() => playScene(currentScene + 1), sceneTimeLeft);
    }
  };

  window.restartVideo = function () {
    clearTimeout(timer);
    clearInterval(progressInterval);
    elapsedTime = 0;
    isPlaying = true;
    if (progressBar) progressBar.style.width = "0%";
    if (pauseBtn) pauseBtn.innerHTML = "&#8741;";
    playScene(0);
    startProgress();
  };

  playScene(0);
  startProgress();
}

/* ============================================================
   CARROSSEL TRATAMENTOS CAPILARES
   Slide clássico com translateX + dots.
   ============================================================ */
function initCarrosselTratamento() {
  const track = document.querySelector(".all-img-tratamento");
  const slides = track
    ? Array.from(track.querySelectorAll(".img-tratamento"))
    : [];
  const btnLeft = document.querySelector(".button-tratamento.left");
  const btnRight = document.querySelector(".button-tratamento.right");
  const dotsWrap = document.querySelector(".dots-tratamento");
  const wrapper = document.querySelector(".carrossel-tratamento");

  if (!track || !slides.length || !btnLeft || !btnRight) return;

  const TOTAL = slides.length;
  let atual = 0;
  let arrasteX = null;
  let dots = [];

  /* Dots */
  if (dotsWrap) {
    slides.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "dot-tratamento" + (i === 0 ? " ativo" : "");
      d.setAttribute("aria-label", `Slide ${i + 1}`);
      d.addEventListener("click", () => irPara(i));
      dotsWrap.appendChild(d);
    });
    dots = Array.from(dotsWrap.querySelectorAll(".dot-tratamento"));
  }

  function irPara(index) {
    atual = (index + TOTAL) % TOTAL;
    track.style.transform = `translateX(-${atual * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("ativo", i === atual));
  }

  btnLeft.addEventListener("click", () => irPara(atual - 1));
  btnRight.addEventListener("click", () => irPara(atual + 1));

  /* Swipe touch */
  if (wrapper) {
    wrapper.addEventListener(
      "touchstart",
      (e) => {
        arrasteX = e.touches[0].clientX;
      },
      { passive: true },
    );
    wrapper.addEventListener("touchend", (e) => {
      if (arrasteX === null) return;
      const diff = arrasteX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) irPara(atual + (diff > 0 ? 1 : -1));
      arrasteX = null;
    });
  }
}

/* ============================================================
   HEADER – aparece ao rolar
   ============================================================ */
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;
  window.addEventListener(
    "scroll",
    () => {
      header.style.transform =
        window.scrollY > 50 ? "translateY(0)" : "translateY(-100%)";
    },
    { passive: true },
  );
}

/* ============================================================
   SMOOTH SCROLL – links da nav
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initSlideshow();
  initCarrosselTratamento();
  initHeaderScroll();
  initSmoothScroll();
});
