const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const songList = document.querySelector("ul");
const progressed = document.getElementById("progressed");
const progressBar = document.getElementById("progressBar");

let index = 0;
let currentSongUl = undefined;
let currentSongName = undefined;
let music = undefined;
updateMusic(0);

playBtn.addEventListener("click", () => {
  if (isPlaying()) stopMusic();
  else startMusic();
});

prevBtn.addEventListener("click", () => {
  playBackward();
});

nextBtn.addEventListener("click", () => {
  playForward();
});

function stopMusic() {
  if (isPlaying() == false) {
    return;
  }
  playBtn.querySelector("i").classList.remove("fa-pause");
  playBtn.querySelector("i").classList.add("fa-play");
  music.pause();
}

function startMusic() {
  if (isPlaying() == true) {
    return;
  }
  playBtn.querySelector("i").classList.remove("fa-play");
  playBtn.querySelector("i").classList.add("fa-pause");
  music.ontimeupdate = function (e) {
    progressed.style.width = (music.currentTime * 100) / music.duration + "%";
  };
  progressBar.onclick = function (e) {
    music.currentTime = (e.offsetX / progressBar.offsetWidth) * music.duration;
  };
  music.play();
}

function isPlaying() {
  return playBtn.querySelector("i").classList.contains("fa-pause");
}

function playForward() {
  stopMusic();
  index = (index + 1) % songList.children.length;
  updateMusic(index);
  startMusic();
}

function playBackward() {
  stopMusic();
  index = index - 1;
  if (index < 0) index = songList.children.length - 1;
  updateMusic(index);
  startMusic();
}

function updateMusic(index) {
  if (currentSongUl !== undefined) currentSongUl.classList.remove("playing");

  currentSongUl = songList.children[index];
  currentSongName = currentSongUl.innerText;
  music = new Audio(`./audio/${currentSongName}.mp3`);

  currentSongUl.classList.add("playing");
}

function selectMusic() {
  stopMusic();

  let nodes = Array.from(this.event.target.closest("ul").children);
  let index = nodes.indexOf(this.event.target.closest("li"));
  updateMusic(index);

  startMusic();
}
