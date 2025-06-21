document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const startScreen = document.getElementById("startScreen");
  const statusEl = document.getElementById("status");
  const scene = document.querySelector("a-scene");
  const imageTarget = document.querySelector("#image-target");
  const particles = document.querySelector("#particles");

  const sound = new Howl({
    src: ["sound.mp3"],
    volume: 1.0
  });

  startButton.addEventListener("click", async () => {
    try {
      // Request camera permission
      await navigator.mediaDevices.getUserMedia({ video: true });

      // Hide start screen
      startScreen.style.display = "none";

      // Start MindAR scene
      const mindarComponent = scene.components["mindar-image"];
      await mindarComponent.start();

      statusEl.textContent = "📷 Camera started. Point it at your image.";
    } catch (e) {
      statusEl.textContent = "❌ Failed to start camera: " + e.message;
    }
  });

  imageTarget.addEventListener("targetFound", () => {
    statusEl.textContent = "✅ Target detected!";
    sound.play();
    particles.setAttribute("visible", "true");
  });

  imageTarget.addEventListener("targetLost", () => {
    statusEl.textContent = "❌ Lost target.";
    particles.setAttribute("visible", "false");
  });
});
