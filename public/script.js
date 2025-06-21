document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const startScreen = document.getElementById("startScreen");
  const statusEl = document.getElementById("status");
  const scene = document.querySelector("a-scene");
  const imageTarget = document.querySelector("#image-target");
  const particles = document.querySelector("#particles");

  // Sound is ignored for now

  startButton.addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      const video = document.getElementById("video");
      video.srcObject = stream;

      startScreen.style.display = "none";
      statusEl.textContent = "📷 Camera started. Starting MindAR...";

      await new Promise((resolve) => {
        if (scene.hasLoaded && scene.components["mindar-image"]) {
          resolve();
        } else {
          scene.addEventListener("loaded", () => {
            resolve();
          });
        }
      });

      const mindarComponent = scene.components["mindar-image"];
      await mindarComponent.start();

      statusEl.textContent = "🔍 Scanning image...";
      console.log("MindAR started");
    } catch (e) {
      statusEl.textContent = "❌ Failed to start camera: " + e.message;
      console.error(e);
    }
  });

  imageTarget.addEventListener("targetFound", () => {
    console.log("DEBUG: targetFound");
    statusEl.textContent = "✅ Target detected!";
    particles.setAttribute("visible", "true");
  });

  imageTarget.addEventListener("targetLost", () => {
    console.log("DEBUG: targetLost");
    statusEl.textContent = "🔍 Scanning image...";
    particles.setAttribute("visible", "false");
  });
});
