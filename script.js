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
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },

  {
    title: "Weak",
    subtitle: "I know this one is special ✨",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },

  {
    title: "Come Hang Out",
    subtitle: "Come hang out with me ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },

  {
    title: "Steve's Going to London",
    subtitle: "Take me back to London 🎤",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },

  {
    title: "Bang!",
    subtitle: "BANG! 💥",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },


  {
    title: "Karma",
    subtitle: "My Favorite :)",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },

  {
    title: "Burn The House Down",
    subtitle: "LET'S LIGHT THIS PLACE UP 🔥",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Burn_The_House_Down_Live_From_One_Spectacular_Night"
  },

  {
    title: "100 Bad Days",
    subtitle: "Here's to all the memories ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },
  
  {
    title: "Dear Winter",
    subtitle: "This one is for you ❤️",
    // NOTE: previously this used the same filename as 100 Bad Days; replace with the correct file name.
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },
  
  {
    title: "Sober Up",
    subtitle: "One of your favorites 🎸",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_Rivers_Cuomo_-_Sober_Up_Live_in_LA"
  },

  {
    title: "World's Smallest Violin",
    subtitle: "Let's goooo 🎻",
    // This was previously a cloudinary URL missing an explicit extension — confirm the URL or replace with a local file name.
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Worlds_Smallest_Violin_Live_from_the_OKO_Tour_-_AJR_1080p.mp4"
  },

  {
    title: "Inertia",
    subtitle: "A little acoustic moment ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  },
  
  {
    title: "Finale",
    subtitle: "Hope you enjoyed the show ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/"
  }

];

let currentIndex = 0;
let countdownTimer = null;

// Safe element getter to avoid immediate crashes if an element is missing.
function $id(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`Missing element with id="${id}" — some features may not work.`);
  return el;
}

const ticketScreen = $id("ticketScreen");
const countdownScreen = $id("countdownScreen");
const concert = $id("concert");
const countdownEl = $id("countdown");
const enterBtn = $id("enterBtn");
const startShowBtn = $id("startShowBtn");
const messageOverlay = $id("messageOverlay");

const videoPlayer = $id("videoPlayer");
const playBtn = $id("playBtn");
const prevBtn = $id("prevBtn");
const nextBtn = $id("nextBtn");
const progress = $id("progress");
const volume = $id("volume");
const currentTimeEl = $id("currentTime");
const durationEl = $id("duration");

const songTitle = $id("songTitle");
const songSubtitle = $id("songSubtitle");
const setlistItems = $id("setlistItems");

const encore = $id("encore");
const encoreBtn = $id("encoreBtn");
const fullscreenBtn = $id("fullscreenBtn");

// Fireworks canvas (may be missing on some pages)
const canvas = $id("fireworks");
const ctx = canvas ? canvas.getContext && canvas.getContext("2d") : null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function buildSetlist() {
  if (!setlistItems) return;
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
  if (!setlistItems) return;
  [...setlistItems.children].forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
}

function isValidSource(src) {
  return typeof src === "string" && src.trim().length > 0;
}

function showMessage(text) {
  if (messageOverlay) {
    messageOverlay.style.display = "flex";
    // If there is a child message area, show text there; otherwise log:
    const msgEl = messageOverlay.querySelector(".message-text");
    if (msgEl) msgEl.textContent = text;
  }
  console.warn(text);
}

function loadVideo(index) {
  if (!videos.length || !videoPlayer) return;

  currentIndex = (index + videos.length) % videos.length;
  const selected = videos[currentIndex];

  if (!selected || !isValidSource(selected.file)) {
    showMessage("Video file name/URL missing for this track. Please update the setlist.");
    return;
  }

  // If the source looks like a URL without extension, that's often unsupported — still try, but warn.
  if (/^https?:\/\/.+(?!\.mp4$)/i.test(selected.file) && !selected.file.toLowerCase().endsWith(".mp4")) {
    console.warn("Remote URL may be missing an explicit .mp4 extension — confirm the URL is a direct video file.");
  }

  videoPlayer.src = selected.file;
  videoPlayer.load();

  if (songTitle) songTitle.textContent = selected.title;
  if (songSubtitle) songSubtitle.textContent = selected.subtitle;

  updateSetlist();

  if (progress) progress.value = 0;
  if (currentTimeEl) currentTimeEl.textContent = "0:00";
  if (durationEl) durationEl.textContent = "0:00";
}

async function playVideo() {
  if (!videoPlayer) return;
  try {
    await videoPlayer.play();
    if (playBtn) playBtn.textContent = "❚❚";
  } catch (error) {
    // Browser blocked playback or autoplay prevented.
    if (playBtn) playBtn.textContent = "▶";
    console.warn("Playback was blocked or failed:", error);
    showMessage("Playback blocked by browser. Press play to start the video.");
  }
}

function pauseVideo() {
  if (!videoPlayer) return;
  videoPlayer.pause();
  if (playBtn) playBtn.textContent = "▶";
}

function togglePlay() {
  if (!videoPlayer) return;
  if (videoPlayer.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
}

function nextVideo() {
  if (!videos.length || !videoPlayer) return;

  if (currentIndex >= videos.length - 1) {
    videoPlayer.pause();
    showEncore();
    return;
  }

  loadVideo(currentIndex + 1);
  playVideo();
}

function previousVideo() {
  if (!videoPlayer) return;
  loadVideo(currentIndex - 1);
  playVideo();
}

function showEncore() {
  if (encore) encore.classList.add("active");
  launchFireworks();
}

function hideEncore() {
  if (encore) encore.classList.remove("active");
  stopFireworks();
}

function startCountdown() {
  if (ticketScreen) ticketScreen.classList.remove("active");
  if (countdownScreen) countdownScreen.classList.add("active");

  let number = 3;
  if (countdownEl) countdownEl.textContent = number;

  countdownTimer = setInterval(() => {
    number--;

    if (number > 0) {
      if (countdownEl) countdownEl.textContent = number;
    } else {
      clearInterval(countdownTimer);
      if (countdownEl) countdownEl.textContent = "♥";

      setTimeout(() => {
        if (countdownScreen) countdownScreen.classList.remove("active");
        if (concert) concert.classList.add("active");
        if (messageOverlay) messageOverlay.style.display = "flex";
        loadVideo(0);
      }, 900);
    }
  }, 1000);
}

if (enterBtn) enterBtn.addEventListener("click", startCountdown);

if (startShowBtn) {
  startShowBtn.addEventListener("click", () => {
    if (messageOverlay) messageOverlay.style.display = "none";
    loadVideo(0);
    playVideo();
  });
}

if (playBtn) playBtn.addEventListener("click", togglePlay);
if (nextBtn) nextBtn.addEventListener("click", nextVideo);
if (prevBtn) prevBtn.addEventListener("click", previousVideo);

if (videoPlayer) {
  videoPlayer.addEventListener("play", () => {
    if (playBtn) playBtn.textContent = "❚❚";
  });

  videoPlayer.addEventListener("pause", () => {
    if (playBtn) playBtn.textContent = "▶";
  });

  videoPlayer.addEventListener("loadedmetadata", () => {
    if (durationEl) durationEl.textContent = formatTime(videoPlayer.duration);
  });

  videoPlayer.addEventListener("timeupdate", () => {
    if (videoPlayer.duration && progress) {
      progress.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    }

    if (currentTimeEl) currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
  });

  if (progress) {
    progress.addEventListener("input", () => {
      if (videoPlayer.duration) {
        videoPlayer.currentTime =
          (Number(progress.value) / 100) * videoPlayer.duration;
      }
    });
  }

  if (volume) {
    volume.addEventListener("input", () => {
      videoPlayer.volume = Number(volume.value);
    });
  }

  videoPlayer.addEventListener("ended", nextVideo);

  // Better reporting when the video source fails to load or decode.
  videoPlayer.addEventListener("error", (e) => {
    const code = videoPlayer.error ? videoPlayer.error.code : "unknown";
    console.error("Video playback error", code, e);
    showMessage("Couldn't load this video. Check the filename/URL and try again.");
  });
}

if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) {
        // Prefer concert element if it exists, else fall back to documentElement.
        const target = concert || document.documentElement;
        await (target.requestFullscreen ? target.requestFullscreen() : document.documentElement.requestFullscreen());
        fullscreenBtn.textContent = "EXIT FULLSCREEN";
      } else {
        await document.exitFullscreen();
        fullscreenBtn.textContent = "FULLSCREEN";
      }
    } catch (error) {
      console.log("Fullscreen unavailable.", error);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!concert || !concert.classList.contains("active")) return;

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
  if (fullscreenBtn) {
    fullscreenBtn.textContent =
      document.fullscreenElement ? "EXIT FULLSCREEN" : "FULLSCREEN";
  }
});

// Simple fireworks effect for the encore.
let fireworks = [];
let fireworksAnimation = null;

function resizeCanvas() {
  if (!canvas || !ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

if (window) {
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}

function makeFirework() {
  if (!canvas) return;
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
  if (!ctx || !canvas) return;
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
  if (!canvas || !ctx) return;
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

function stopFireworks() {
  if (fireworksAnimation) {
    cancelAnimationFrame(fireworksAnimation);
    fireworksAnimation = null;
  }
  fireworks = [];
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

if (encoreBtn) {
  encoreBtn.addEventListener("click", () => {
    hideEncore();

    // Replay the first video for the encore.
    loadVideo(0);
    playVideo();
  });
}

buildSetlist();
loadVideo(0);
if (videoPlayer) videoPlayer.volume = 1;
