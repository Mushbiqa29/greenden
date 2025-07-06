const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("side-menu");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sideMenu.style.right = hamburger.classList.contains("active") ? "0" : "-100%";
});
const canvas = document.getElementById("leafCanvas");
const ctx = canvas.getContext("2d");
const logo = document.getElementById("logo-text");
const content = document.getElementById("content");

// Resize canvas and center leaf
canvas.width = 400;
canvas.height = 400;
ctx.translate(canvas.width / 2, canvas.height / 2); // Centering

ctx.strokeStyle = "#22c55e";
ctx.lineWidth = 2;
ctx.lineCap = "round";

let progress = 0;
const steps = 100;

// Smaller + centered control points
const startPoint = { x: 0, y: 100 };
const topPoint = { x: 0, y: -100 };
const leftCtrl1 = { x: -60, y: 60 };
const leftCtrl2 = { x: -70, y: -20 };
const rightCtrl1 = { x: 60, y: 60 };
const rightCtrl2 = { x: 70, y: -20 };

// Bezier helper
function bezier(t, p0, p1, p2, p3) {
  const x = Math.pow(1 - t, 3) * p0.x +
            3 * Math.pow(1 - t, 2) * t * p1.x +
            3 * (1 - t) * t * t * p2.x +
            t * t * t * p3.x;

  const y = Math.pow(1 - t, 3) * p0.y +
            3 * Math.pow(1 - t, 2) * t * p1.y +
            3 * (1 - t) * t * t * p2.y +
            t * t * t * p3.y;

  return { x, y };
}

function drawLeafFrame() {
  ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

  const t = progress / steps;

  // Left side
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  for (let i = 0; i <= t; i += 0.01) {
    const p = bezier(i, startPoint, leftCtrl1, leftCtrl2, topPoint);
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  // Right side
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  for (let i = 0; i <= t; i += 0.01) {
    const p = bezier(i, startPoint, rightCtrl1, rightCtrl2, topPoint);
    ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();

  progress++;
  if (progress <= steps) {
    requestAnimationFrame(drawLeafFrame);
  } else {
    logo.style.opacity = 1;
    setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
      navbar.classList.remove("hidden");
      content.classList.remove("hidden");
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  drawLeafFrame();
});
  const fadeItems = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.15
  });

  fadeItems.forEach(item => observer.observe(item));
  