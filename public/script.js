document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("status");
  const scene = document.querySelector("a-scene");
  const imageTarget = document.querySelector("#image-target");
  const particles = document.querySelector("#particles");

  const sound = new Howl({
    src: ["sound.mp3"],
    volume: 1.0,
  });

  // Start MindAR on user tap on status div (you had startButton but no button in html)
  statusEl.addEventListener("click", async () => {
    try {
      const mindar = scene.components["mindar-image"];
      if (!mindar.isStarted) {
        await mindar.start();
        statusEl.textContent = "📷 Camera started. Point at your image.";
      }
    } catch (e) {
      statusEl.textContent = "❌ Failed to start camera: " + e.message;
      console.error(e);
    }
  });

  imageTarget.addEventListener("targetFound", () => {
    statusEl.textContent = "✅ Target detected!";
    particles.setAttribute("visible", "true");
    sound.play();
  });

  imageTarget.addEventListener("targetLost", () => {
    statusEl.textContent = "❌ Target lost.";
    particles.setAttribute("visible", "false");
  });
});
