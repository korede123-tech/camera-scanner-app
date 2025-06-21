document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const startScreen = document.getElementById("startScreen");
  const statusEl = document.getElementById("status");
  const scene = document.querySelector("a-scene");

  startButton.addEventListener("click", async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      const video = document.getElementById("video");
      video.srcObject = stream;

      startScreen.style.display = "none";
      statusEl.textContent = "✅ Camera started. Particles running.";
    } catch (e) {
      statusEl.textContent = "❌ Failed to start camera: " + e.message;
      console.error(e);
    }
  });
});
