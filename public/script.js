document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const startScreen = document.getElementById("startScreen");
  const statusEl = document.getElementById("status");
  const scene = document.querySelector("a-scene");
  const imageTarget = document.querySelector("#image-target");
  const particles = document.querySelector("#particles");

  const sound = new Howl({
    src: ["sound.mp3"],
    volume: 1.0,
    onloaderror: (id, err) => console.error("Sound load error:", err),
  });

  startButton.addEventListener("click", async () => {
    try {
      // Start camera stream for your video element
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      const video = document.getElementById("video");
      video.srcObject = stream;

      // Hide start screen
      startScreen.style.display = "none";
      statusEl.textContent = "📷 Camera started. Starting MindAR...";

      // Wait for scene to be loaded and MindAR component ready
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

      statusEl.textContent = "📷 MindAR started. Point at your image.";
      console.log("MindAR started");
    } catch (e) {
      statusEl.textContent = "❌ Failed to start camera: " + e.message;
      console.error(e);
    }
  });

  imageTarget.addEventListener("targetFound", () => {
    console.log("DEBUG: targetFound event fired");
    statusEl.textContent = "✅ Target detected!";
    particles.setAttribute("visible", "true");

    if (sound.state() === "loaded") {
      sound.play();
    } else {
      console.warn("Sound not loaded yet.");
    }
  });

  imageTarget.addEventListener("targetLost", () => {
    console.log("DEBUG: targetLost event fired");
    statusEl.textContent = "❌ Lost target.";
    particles.setAttribute("visible", "false");
  });
});
