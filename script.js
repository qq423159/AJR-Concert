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
    title: "Way Less Sad",
    subtitle: "Let's start the night together ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Making_of_Way_Less_Sad_Live_from_the_Maybe_Man_Tour_1"
  },

  {
    title: "Weak",
    subtitle: "I know this one is special ✨",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Making_of_Weak_Live_From_the_OKO_Tour_-_AJR_1080p_1"
  },

  {
    title: "Come Hang Out",
    subtitle: "Come hang out with me ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-__Come_Hang_Out__Live_from_JITV_HQ_in_Los_Angeles_CA_2017_JAMINTHEVAN"
  },

  {
    title: "Steve's Going to London",
    subtitle: "Take me back to London 🎤",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_Live_-_Steve_s_Going_to_London_Shoreline_Amphitheatre_Mountain_view_CA_2025-07-20"
  },

  {
    title: "Bang!",
    subtitle: "BANG! 💥",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Making_of_Bang_Bang_Live_From_One_Spectacular_Night_-_AJR_1080p_1"
  },


  {
    title: "Karma",
    subtitle: "My Favorite :)",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Karma_Live_From_One_Spectacular_Night"
  },

  {
    title: "Burn The House Down",
    subtitle: "LET'S LIGHT THIS PLACE UP 🔥",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Burn_The_House_Down_Live_From_One_Spectacular_Night"
  },

  {
    title: "100 Bad Days",
    subtitle: "So GOOOOOOOOD",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Making_of_100_Bad_Days_Live_from_Somewhere_in_the_Sky_1
  },
  
  {
    title: "Dear Winter",
    subtitle: "This one is for you ❤️",
    // NOTE: previously this used the same filename as 100 Bad Days; replace with the correct file name.
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/The_Trick_Dear_Winter_Mashup_-_AJR_Live_Barricade_View_Boston_5_20_22"
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
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_Inertia_Acoustic"
  },
  
  {
    title: "Finale",
    subtitle: "Hope you enjoyed the show ❤️",
    file: "https://res.cloudinary.com/fa50m0pf/video/upload/AJR_-_2085_Finale_Live_from_the_Maybe_Man_Tour"
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
