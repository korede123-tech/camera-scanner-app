const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const statusEl = document.getElementById('status');
const ctx = canvas.getContext('2d');

// Load sound
const sound = new Howl({
  src: ['sound.mp3'],
  volume: 1.0
});

let imageClassifier;

// Start webcam with rear-facing camera (or fallback to front)
navigator.mediaDevices.getUserMedia({
  video: {
    facingMode: { ideal: "environment" }
  }
})
.then((stream) => {
  video.srcObject = stream;
})
.catch((err) => {
  console.warn("Rear camera not available, falling back:", err);
  return navigator.mediaDevices.getUserMedia({ video: true }).then((fallbackStream) => {
    video.srcObject = fallbackStream;
  });
});

// Load ML model for classification
ml5.imageClassifier('MobileNet')
  .then((classifier) => {
    imageClassifier = classifier;
    detectLoop();
  })
  .catch((err) => {
    console.error("Failed to load image classifier:", err);
  });

function detectLoop() {
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    imageClassifier.classify(canvas, (err, results) => {
      if (err) {
        console.error("Classification error:", err);
        return;
      }

      const label = results[0].label.toLowerCase();
      console.log("Detected:", label);

      // Update status text
      statusEl.innerText = "Detected: " + label;

      // Trigger sound if label matches
      if (
        label.includes("book") ||
        label.includes("paper") ||
        label.includes("notebook") ||
        label.includes("document") ||
        label.includes("page") ||
        label.includes("cover") ||
        label.includes("text") ||
        label.includes("white")
      ) {
        statusEl.innerText = "✅ Match Found! Playing sound...";
        sound.play();
      }
    });
  }, 2000); // Every 2 seconds
}
