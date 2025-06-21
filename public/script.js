document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const startScreen = document.getElementById("startScreen");
  const statusEl = document.getElementById("status");

  const sceneEl = document.querySelector("a-scene");
  const particlesContainer = document.getElementById("particles");
  const audio = document.querySelector("#scanSound");

  let particleData = [];
  let isAnimating = false;
  let hasPlayedSound = false;

  function createParticles(num = 70) {
    for (let i = 0; i < num; i++) {
      const p = document.createElement("a-entity");
      const x = (Math.random() - 0.5) * 0.6;
      const y = (Math.random() - 0.5) * 0.6;
      const z = (Math.random() - 0.5) * 0.6;
      const scale = Math.random() * 0.015 + 0.01;

      p.setAttribute("geometry", `primitive: sphere; radius: ${scale}`);
      p.setAttribute("material", "color: white; opacity: 0.8; transparent: true");
      p.setAttribute("position", `${x} ${y} ${z}`);
      particlesContainer.appendChild(p);
      particleData.push({ el: p, speedY: Math.random() * 0.005 + 0.002 });
    }
  }

  function animateParticles() {
    if (!isAnimating) return;
    particleData.forEach(p => {
      const pos = p.el.getAttribute("position");
      pos.y += p.speedY;
      if (pos.y > 0.4) {
        pos.y = -0.4;
        pos.x = (Math.random() - 0.5) * 0.6;
        pos.z = (Math.random() - 0.5) * 0.6;
      }
      p.el.setAttribute("position", pos);
    });
    requestAnimationFrame(animateParticles);
  }

  startButton.addEventListener("click", async () => {
    startScreen.style.display = "none";
    statusEl.textContent = "🔍 Point camera at image...";

    await sceneEl.components["mindar-image"].start();

    const target = document.querySelector("[mindar-image-target]");
    target.addEventListener("targetFound", () => {
      if (!hasPlayedSound) {
        audio.play();
        hasPlayedSound = true;
      }

      if (!isAnimating) {
        createParticles();
        isAnimating = true;
        animateParticles();
        statusEl.textContent = "✅ Image detected. Particles floating.";
      }
    });

    target.addEventListener("targetLost", () => {
      statusEl.textContent = "📷 Searching for image...";
      hasPlayedSound = false;
    });
  });
});
