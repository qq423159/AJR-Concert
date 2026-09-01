// ============================================
// AJR VIRTUAL CONCERT
// Put your video files in the SAME FOLDER
// as index.html, style.css, and script.js.
// Then change the filenames below.
// ============================================

const wifeName = "MY BEAUTIFUL WIFE";

// Change these filenames to EXACTLY match your .mp4 files.
// Example: "Bang Bang - Live.mp4"
const videos = [

  {
    title: "Making Way Less Sad",
    subtitle: "Let's start the night together ❤️",
    file: "AJR - Making of Way Less Sad (Live from the Maybe Man Tour).mp4"
  },

  {
    title: "Weak",
    subtitle: "I know this one is special ✨",
    file: "AJR - Making of Weak (Live From the OKO Tour) - AJR (1080p) (1).mp4"
  },

  {
    title: "Come Hang Out",
    subtitle: "Come hang out with me ❤️",
    file: "AJR - _Come Hang Out_ (Live from JTV HQ in Los Angeles, CA 2017) #JAMIN THEVAN.mp4"
  },

  {
    title: "Steve's Going to London",
    subtitle: "Take me back to London 🎤",
    file: "AJR Live - Steve's Going to London (Shoreline Amphitheatre, Mountain view, CA 2025-07-20).mp4"
  },

  {
    title: "Bang!",
    subtitle: "BANG! 💥",
    file: "AJR - Making of Bang! Bang! (Live From One Spectacular Night) - AJR (1080p) (1).mp4"
  },


  {
    title: "Karma",
    subtitle: "My Favorite :)",
    file: "AJR - Karma (Live From One Spectacular Night).mp4"
  },

  {
    title: "Burn The House Down",
    subtitle: "LET'S LIGHT THIS PLACE UP 🔥",
    file: "AJR - Burn The House Down (Live From One Spectacular Night).mp4"
  },

  {
    title: "100 Bad Days",
    subtitle: "Here's to all the memories ❤️",
    file: "AJR - Making of 100 Bad Days (Live from Somewhere in the Sky) (1).mp4"
  },
  
  {
    title: "Dear Winter",
    subtitle: "This one is for you ❤️",
    file: "AJR - Making of 100 Bad Days (Live from Somewhere in the Sky) (1).mp4"
  },
  
  {
    title: "Sober Up",
    subtitle: "One of your favorites 🎸",
    file: "AJR & Rivers Cuomo - Sober Up (Live in LA).mp4"
  },

  {
    title: "World's Smallest Violin",
    subtitle: "Let's goooo 🎻",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Worlds_Smallest_Violin_Live_from_the_OKO_Tour_-_AJR_1080p"
  },

  {
    title: "Inertia",
    subtitle: "A little acoustic moment ❤️",
    file: "AJR - Inertia (Acoustic).mp4"
  },
  
    {
    title: "Finale",
    subtitle: "Hope you enjoyed the show ❤️",
    file: "AJR - 2085 Finale (Live from the Maybe Man Tour).mp4"
  }

];
let currentIndex = 0;
let countdownTimer = null;

const ticketScreen = document.getElementById("ticketScreen");
const countdownScreen = document.getElementById("countdownScreen");
const concert = document.getElementById("concert");
const countdownEl = document.getElementById("countdown");
const enterBtn = document.getElementById("enterBtn");
const startShowBtn = document.getElementById("startShowBtn");
const messageOverlay = document.getElementById("messageOverlay");

const videoPlayer = document.getElementById("videoPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const songSubtitle = document.getElementById("songSubtitle");
const setlistItems = document.getElementById("setlistItems");

const encore = document.getElementById("encore");
const encoreBtn = document.getElementById("encoreBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function buildSetlist() {
  setlistItems.innerHTML = "";

  videos.forEach((video, index) => {
    const item = document.createElement("div");
    item.className = "setlist-item";
    item.textContent = `${String(index + 1).padStart(2, "0")}  ${video.title}`;
    item.addEventListener("click", () => {
      loadVideo(index);
      playVideo();
    });
    setlistItems.appendChild(item);
  });
}

function updateSetlist() {
  [...setlistItems.children].forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
}

function loadVideo(index) {
  if (!videos.length) return;

  currentIndex = (index + videos.length) % videos.length;

  const selected = videos[currentIndex];

  videoPlayer.src = selected.file;
  videoPlayer.load();

  songTitle.textContent = selected.title;
  songSubtitle.textContent = selected.subtitle;

  updateSetlist();

  progress.value = 0;
  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";
}

async function playVideo() {
  try {
    await videoPlayer.play();
    playBtn.textContent = "❚❚";
  } catch (error) {
    // Browser blocked playback. The user can press play.
    playBtn.textContent = "▶";
  }
}

function pauseVideo() {
  videoPlayer.pause();
  playBtn.textContent = "▶";
}

function togglePlay() {
  if (videoPlayer.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
}

function nextVideo() {
  if (currentIndex >= videos.length - 1) {
    videoPlayer.pause();
    showEncore();
    return;
  }

  loadVideo(currentIndex + 1);
  playVideo();
}

function previousVideo() {
  loadVideo(currentIndex - 1);
  playVideo();
}

function showEncore() {
  encore.classList.add("active");
  launchFireworks();
}

function hideEncore() {
  encore.classList.remove("active");
}

function startCountdown() {
  ticketScreen.classList.remove("active");
  countdownScreen.classList.add("active");

  let number = 3;
  countdownEl.textContent = number;

  countdownTimer = setInterval(() => {
    number--;

    if (number > 0) {
      countdownEl.textContent = number;
    } else {
      clearInterval(countdownTimer);
      countdownEl.textContent = "♥";

      setTimeout(() => {
        countdownScreen.classList.remove("active");
        concert.classList.add("active");
        messageOverlay.style.display = "flex";
        loadVideo(0);
      }, 900);
    }
  }, 1000);
}

enterBtn.addEventListener("click", startCountdown);

startShowBtn.addEventListener("click", () => {
  messageOverlay.style.display = "none";
  loadVideo(0);
  playVideo();
});

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextVideo);
prevBtn.addEventListener("click", previousVideo);

videoPlayer.addEventListener("play", () => {
  playBtn.textContent = "❚❚";
});

videoPlayer.addEventListener("pause", () => {
  playBtn.textContent = "▶";
});

videoPlayer.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(videoPlayer.duration);
});

videoPlayer.addEventListener("timeupdate", () => {
  if (videoPlayer.duration) {
    progress.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
  }

  currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
});

progress.addEventListener("input", () => {
  if (videoPlayer.duration) {
    videoPlayer.currentTime =
      (Number(progress.value) / 100) * videoPlayer.duration;
  }
});

volume.addEventListener("input", () => {
  videoPlayer.volume = Number(volume.value);
});

videoPlayer.addEventListener("ended", nextVideo);

fullscreenBtn.addEventListener("click", async () => {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      fullscreenBtn.textContent = "EXIT FULLSCREEN";
    } else {
      await document.exitFullscreen();
      fullscreenBtn.textContent = "FULLSCREEN";
    }
  } catch (error) {
    console.log("Fullscreen unavailable.");
  }
});

document.addEventListener("keydown", (event) => {
  if (!concert.classList.contains("active")) return;

  if (event.code === "Space") {
    event.preventDefault();
    togglePlay();
  }

  if (event.code === "ArrowRight") {
    nextVideo();
  }

  if (event.code === "ArrowLeft") {
    previousVideo();
  }
});

document.addEventListener("fullscreenchange", () => {
  fullscreenBtn.textContent =
    document.fullscreenElement ? "EXIT FULLSCREEN" : "FULLSCREEN";
});

// Simple fireworks effect for the encore.
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let fireworks = [];
let fireworksAnimation = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function makeFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.55 + 50;
  const particles = [];

  for (let i = 0; i < 55; i++) {
    const angle = (Math.PI * 2 * i) / 55;
    const speed = 2 + Math.random() * 4;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1
    });
  }

  fireworks.push(particles);
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((particles) => {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.025;
      p.life -= 0.012;

      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    });
  });

  fireworks = fireworks.filter((particles) =>
    particles.some((p) => p.life > 0)
  );

  fireworksAnimation = requestAnimationFrame(animateFireworks);
}

function launchFireworks() {
  if (!fireworksAnimation) {
    animateFireworks();
  }

  let count = 0;
  const interval = setInterval(() => {
    makeFirework();
    count++;

    if (count >= 12) {
      clearInterval(interval);
    }
  }, 280);
}

encoreBtn.addEventListener("click", () => {
  hideEncore();

  // Replay the first video for the encore.
  loadVideo(0);
  playVideo();
});

buildSetlist();
loadVideo(0);
videoPlayer.volume = 1;
