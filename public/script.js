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

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Camera error:", err);
  });

// Load image classifier
ml5.imageClassifier('MobileNet')
  .then((classifier) => {
    imageClassifier = classifier;
    detectLoop();
  });

function detectLoop() {
  setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    imageClassifier.classify(canvas, (err, results) => {
      if (err) return console.error(err);

      const label = results[0].label;
      console.log("Detected:", label);
      if (label.includes("book") || label.includes("page")) {
        statusEl.innerText = "Match Found! Triggering sound.";
        sound.play();
      } else {
        statusEl.innerText = "Scanning...";
      }
    });
  }, 2000); // Scan every 2 seconds
}

