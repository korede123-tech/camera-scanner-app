const message = document.getElementById("message");
let played = false;

// Load and set up sound
const sound = new Howl({
  src: ['sound.mp3'],
  volume: 1.0
});

// Listen for detection events
AFRAME.scenes[0].addEventListener("targetFound", () => {
  if (!played) {
    message.innerText = "✅ Image detected. Playing sound!";
    sound.play();
    played = true;
  }
});

AFRAME.scenes[0].addEventListener("targetLost", () => {
  message.innerText = "🔍 Waiting for image...";
  played = false;
});
