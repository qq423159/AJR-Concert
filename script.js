/* ================================
   CUSTOMIZE THESE
================================ */

const wifeName = "MY BEAUTIFUL WIFE";

const songs = [
  { title:"Song One", artist:"Your Artist", file:"music/song1.mp3", led:"SONG ONE", subtitle:"Let's begin ❤️" },
  { title:"Song Two", artist:"Your Artist", file:"music/song2.mp3", led:"SONG TWO", subtitle:"This one's for you" },
  { title:"Song Three", artist:"Your Artist", file:"music/song3.mp3", led:"SONG THREE", subtitle:"Keep dancing ✨" },
  { title:"Final Song", artist:"Your Artist", file:"music/song4.mp3", led:"ONE LAST SONG", subtitle:"❤️" }
];

/* ================================
   ELEMENTS
================================ */

const introScreen=document.getElementById("introScreen");
const countdownScreen=document.getElementById("countdownScreen");
const concert=document.getElementById("concert");
const enterButton=document.getElementById("enterButton");
const countdownText=document.getElementById("countdownText");
const countdownSubtext=document.getElementById("countdownSubtext");
const loadingProgress=document.getElementById("loadingProgress");
const wifeNameElement=document.getElementById("wifeName");
const audio=document.getElementById("audioPlayer");
const playButton=document.getElementById("playButton");
const previousButton=document.getElementById("previousButton");
const nextButton=document.getElementById("nextButton");
const progress=document.getElementById("progress");
const volume=document.getElementById("volume");
const currentTime=document.getElementById("currentTime");
const duration=document.getElementById("duration");
const songTitle=document.getElementById("songTitle");
const artistName=document.getElementById("artistName");
const topSongTitle=document.getElementById("topSongTitle");
const ledTitle=document.getElementById("ledTitle");
const ledSubtitle=document.getElementById("ledSubtitle");
const setlist=document.querySelector(".setlist");
const setlistButton=document.getElementById("setlistButton");
const closeSetlist=document.getElementById("closeSetlist");
const setlistSongs=document.getElementById("setlistSongs");
const messageOverlay=document.getElementById("messageOverlay");
const closeMessage=document.getElementById("closeMessage");
const encoreScreen=document.getElementById("encoreScreen");
const encoreButton=document.getElementById("encoreButton");
const fullscreenButton=document.getElementById("fullscreenButton");
const fireworksCanvas=document.getElementById("fireworks");

let currentSong=0;
wifeNameElement.textContent=wifeName;

function buildSetlist(){
  setlistSongs.innerHTML="";
  songs.forEach((song,index)=>{
    const item=document.createElement("div");
    item.className="setlist-song";
    item.innerHTML=`<div class="song-number">${String(index+1).padStart(2,"0")}</div><div class="song-name">${song.title}</div>`;
    item.addEventListener("click",()=>{loadSong(index);setlist.classList.remove("open");playSong();});
    setlistSongs.appendChild(item);
  });
}
buildSetlist();

function loadSong(index){
  if(index<0) index=songs.length-1;
  if(index>=songs.length) index=0;
  currentSong=index;
  const song=songs[currentSong];
  audio.src=song.file;
  songTitle.textContent=song.title;
  artistName.textContent=song.artist;
  topSongTitle.textContent=song.title;
  ledTitle.textContent=song.led;
  ledSubtitle.textContent=song.subtitle;
  document.querySelectorAll(".setlist-song").forEach((item,i)=>item.classList.toggle("active",i===currentSong));
  changeLighting(currentSong);
}

function playSong(){
  audio.play().then(()=>playButton.textContent="❚❚").catch(()=>playButton.textContent="▶");
}
function pauseSong(){audio.pause();playButton.textContent="▶";}

playButton.addEventListener("click",()=>audio.paused?playSong():pauseSong());

function nextSong(){
  currentSong++;
  if(currentSong>=songs.length){startEncore();return;}
  loadSong(currentSong);
  playSong();
}
nextButton.addEventListener("click",nextSong);

previousButton.addEventListener("click",()=>{
  currentSong--;
  if(currentSong<0) currentSong=songs.length-1;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener("ended",nextSong);
audio.addEventListener("loadedmetadata",()=>duration.textContent=formatTime(audio.duration));
audio.addEventListener("timeupdate",()=>{
  if(!audio.duration)return;
  progress.value=(audio.currentTime/audio.duration)*100;
  currentTime.textContent=formatTime(audio.currentTime);
});
progress.addEventListener("input",()=>{
  if(audio.duration) audio.currentTime=(progress.value/100)*audio.duration;
});
function formatTime(seconds){
  if(!seconds||isNaN(seconds))return "0:00";
  return Math.floor(seconds/60)+":"+String(Math.floor(seconds%60)).padStart(2,"0");
}
volume.addEventListener("input",()=>audio.volume=volume.value/100);
audio.volume=.8;

enterButton.addEventListener("click",startConcert);

function startConcert(){
  introScreen.classList.remove("active");
  countdownScreen.classList.add("active");
  let count=3, progressValue=0;
  countdownText.textContent=count;
  countdownSubtext.textContent="The lights are going down...";
  const timer=setInterval(()=>{
    progressValue+=10;
    loadingProgress.style.width=progressValue+"%";
    count--;
    if(count>0) countdownText.textContent=count;
    if(count===0){
      countdownText.textContent="LET'S GO";
      countdownSubtext.textContent="The show is yours.";
    }
    if(progressValue>=100){
      clearInterval(timer);
      setTimeout(()=>{
        countdownScreen.classList.remove("active");
        concert.classList.add("active");
        loadSong(0);
        setTimeout(()=>messageOverlay.classList.add("show"),1000);
      },1000);
    }
  },500);
}

closeMessage.addEventListener("click",()=>messageOverlay.classList.remove("show"));
setlistButton.addEventListener("click",()=>setlist.classList.add("open"));
closeSetlist.addEventListener("click",()=>setlist.classList.remove("open"));

fullscreenButton.addEventListener("click",async()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){console.log(e);}
});

function changeLighting(index){
  const stage=document.querySelector(".stage");
  const led=document.querySelector(".led-wall");
  stage.classList.remove("lighting-1","lighting-2","lighting-3","lighting-4");
  stage.classList.add("lighting-"+(index+1));
  const glows=[
    "0 0 70px rgba(120,60,255,.5)",
    "0 0 70px rgba(255,60,100,.5)",
    "0 0 70px rgba(60,150,255,.5)",
    "0 0 100px rgba(255,255,255,.8)"
  ];
  led.style.boxShadow=glows[index]||glows[0];
}

function startEncore(){
  pauseSong();
  encoreScreen.classList.add("show");
}

encoreButton.addEventListener("click",()=>{
  encoreScreen.classList.remove("show");
  currentSong=0;
  loadSong(currentSong);
  playSong();
  startFireworks();
});

const canvas=fireworksCanvas;
const ctx=canvas.getContext("2d");
let particles=[];
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);

function createFirework(){
  const x=Math.random()*canvas.width;
  const y=Math.random()*canvas.height*.5;
  for(let i=0;i<50;i++){
    const angle=Math.random()*Math.PI*2;
    const speed=Math.random()*6+2;
    particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:100});
  }
}
function animateFireworks(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,index)=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.life-=1;
    ctx.globalAlpha=p.life/100;
    ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fillStyle="white";ctx.fill();
    if(p.life<=0)particles.splice(index,1);
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function startFireworks(){
  canvas.classList.add("active");
  const fireworks=setInterval(createFirework,500);
  setTimeout(()=>clearInterval(fireworks),15000);
}

document.addEventListener("keydown",event=>{
  if(event.code==="Space"){event.preventDefault();audio.paused?playSong():pauseSong();}
  if(event.code==="ArrowRight")nextSong();
  if(event.code==="ArrowLeft")previousButton.click();
});

loadSong(0);
