const appRoot = document.getElementById("appRoot");
const player = document.getElementById("player");
const menuScreen = document.getElementById("menuScreen");
const playBtn = document.getElementById("playBtn");
const watchCheck = document.getElementById("watchCheck");
const watchCheckMessage = document.getElementById("watchCheckMessage");
const stillHereBtn = document.getElementById("stillHereBtn");
const leaveBtn = document.getElementById("leaveBtn");

const MENU_BACKGROUND_VIDEO = "preview.mp4";
const PLAYLIST = ["Final Are you a vulture.mov"];
const WATCH_PROMPT_EVERY_SECONDS = 60;

let currentVideoIndex = -1;
let isWatchPromptOpen = false;
let isMovieMode = false;
let nextWatchPromptTime = WATCH_PROMPT_EVERY_SECONDS;

function showMenu() {
  menuScreen.classList.remove("is-hidden");
}

function hideMenu() {
  menuScreen.classList.add("is-hidden");
}

function resetCheckpointState() {
  isWatchPromptOpen = false;
  nextWatchPromptTime = WATCH_PROMPT_EVERY_SECONDS;
  watchCheck.hidden = true;
}

function closeSite() {
  window.close();
}

async function requestFullscreen() {
  if (document.fullscreenElement) {
    return;
  }

  const fullscreenTarget = player.requestFullscreen ? player : appRoot;
  if (!fullscreenTarget.requestFullscreen) {
    return;
  }

  try {
    await fullscreenTarget.requestFullscreen();
  } catch {}
}

async function exitFullscreen() {
  if (!document.fullscreenElement || typeof document.exitFullscreen !== "function") {
    return;
  }

  try {
    await document.exitFullscreen();
  } catch {}
}

async function toggleFullscreen() {
  if (document.fullscreenElement) {
    await exitFullscreen();
    return;
  }

  await requestFullscreen();
}

async function playMenuBackground() {
  isMovieMode = false;
  showMenu();
  resetCheckpointState();
  player.src = MENU_BACKGROUND_VIDEO;
  player.controls = false;
  player.loop = true;
  player.muted = true;

  try {
    await player.play();
  } catch {}
}

function getNextVideo() {
  if (PLAYLIST.length === 0) {
    return "";
  }

  currentVideoIndex = (currentVideoIndex + 1) % PLAYLIST.length;
  return PLAYLIST[currentVideoIndex];
}

async function startNextVideo() {
  const nextVideo = getNextVideo();
  if (!nextVideo) {
    return;
  }

  resetCheckpointState();
  isMovieMode = true;
  hideMenu();
  player.pause();
  player.src = nextVideo;
  player.controls = true;
  player.currentTime = 0;
  player.loop = false;
  player.muted = false;

  await requestFullscreen();

  try {
    await player.play();
  } catch {
    showMenu();
  }
}

async function openWatchPrompt(message) {
  isWatchPromptOpen = true;
  watchCheckMessage.textContent = message || "Are you still watching?";

  if (document.fullscreenElement && typeof document.exitFullscreen === "function") {
    try {
      await document.exitFullscreen();
    } catch {}
  }

  player.pause();
  watchCheck.hidden = false;
}

playBtn.addEventListener("click", () => {
  void startNextVideo();
});

stillHereBtn.addEventListener("click", async () => {
  watchCheck.hidden = true;
  isWatchPromptOpen = false;

  try {
    await requestFullscreen();
    await player.play();
  } catch {}
});

leaveBtn.addEventListener("click", () => {
  closeSite();
});

player.addEventListener("timeupdate", () => {
  if (!isMovieMode || isWatchPromptOpen || menuScreen.classList.contains("is-hidden") === false) {
    return;
  }

  if (player.currentTime >= nextWatchPromptTime) {
    nextWatchPromptTime += WATCH_PROMPT_EVERY_SECONDS;
    void openWatchPrompt("Are you still watching?");
  }
});

player.addEventListener("dblclick", () => {
  if (!isMovieMode) {
    return;
  }

  void toggleFullscreen();
});

document.addEventListener("keydown", (event) => {
  if (!isMovieMode) {
    return;
  }

  if (event.key === "f" || event.key === "F") {
    event.preventDefault();
    void toggleFullscreen();
  }

  if (event.key === "Escape" && document.fullscreenElement) {
    event.preventDefault();
    void exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  // Allow native fullscreen toggle on player controls to minimize without resetting playback.
});

player.addEventListener("error", () => {
  if (!isMovieMode) {
    return;
  }

  console.error("Video playback error:", player.error);
  void playMenuBackground();
});

player.addEventListener("ended", () => {
  void playMenuBackground();
});

void playMenuBackground();