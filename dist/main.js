// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
class VideoPlayer {
  constructor(options) {
    this.video = null;
    this.playBtn = null;
    this.forwardBtn = null;
    this.backwardBtn = null;
    this.playback = null;
    this.currentTime = null;
    this.duration = null;
    this.volumeInput = null;
    this.muteBtn = null;
    this.settingsOptions = null;
    this.settingBtn = null;
    this.fullScreen = null;
    this.parentId = options.parentId;
    this.src = options.src;
    options.skipAmount ? this.skipAmount = options.skipAmount : this.skipAmount = 10;
    options.width ? this.width = options.width : this.width = "800px";
    options.theme ? this.theme = options.theme : this.theme = "rgba(0, 0, 0, 0.7)";
    options.btnColor ? this.btnColor = options.btnColor : this.btnColor = "#ccc";
    options.fontSize ? this.fontSize = options.fontSize : this.fontSize = "20px";
    this.initialize();
  }
  initialize() {
    this.addVideoHtml();
    this.addPlayerStyles();
  }
  addVideoHtml() {
    const parent = document.getElementById(this.parentId);
    if (!parent) {
      console.error("Parent element not found!");
      return;
    }
    parent.innerHTML = `
    <div class="video-container">
      <video src="${this.src}" class="object-fit-contain" preload="auto"></video>
      <div class="controls-container">
        <div class="playback-cont">
          <span class="time-span" id="current-time">00:00</span>
          <input id="playback" type="range" min="0" step="1" value="0" disabled>
          <span class="time-span" id="duration">00:00</span>
        </div>
        <div class="controls-btns">
          <div class="l-btns">
            <button id="backward-btn" value="backward"><i class="bi bi-rewind-fill"></i></button>
            <button id="play-btn" value="play"><i class="bi bi-play-fill"></i></button>
            <button id="forward-btn" value="forward"><i class="bi bi-fast-forward-fill"></i></button>
            <div class="volume-controls">
              <button id="mute-btn" title="Mute/Unmute"><i class="bi bi-volume-up-fill"></i></button>
              <input type="range" id="volume" value="1" step="0.01" min="0" max="1">
            </div>
          </div>
          <div class="r-btns">
            <div id="settings-options" class="settings-options">
              <p data-speed="1">1x speed</p>
              <p data-speed="2">2x speed</p>
              <p data-speed="3">3x speed</p>
            </div>
            <button id="setting-btn" class="fullscreen-btn" title="settings"><i class="bi bi-gear-fill"></i></button>
            <button id="fullscreen-btn" class="fullscreen-btn" title="Fullscreen"><i class="bi bi-fullscreen"></i></button>
          </div>
        </div>
      </div>
    </div>`;
    this.video = parent.querySelector("video");
    this.playBtn = parent.querySelector("#play-btn");
    this.backwardBtn = parent.querySelector("#backward-btn");
    this.forwardBtn = parent.querySelector("#forward-btn");
    this.playback = parent.querySelector("#playback");
    this.currentTime = parent.querySelector("#current-time");
    this.duration = parent.querySelector("#duration");
    this.volumeInput = parent.querySelector("#volume");
    this.muteBtn = parent.querySelector("#mute-btn");
    this.settingsOptions = parent.querySelector("#settings-options");
    this.settingBtn = parent.querySelector("#setting-btn");
    this.fullScreen = parent.querySelector("#fullscreen-btn");
    this.video.addEventListener('loadedmetadata', () => {
      if (!this.video || !this.playback || !this.duration)
        return;
      const totalSeconds = Math.floor(this.video.duration);
      this.playback.max = totalSeconds.toString();
      this.duration.textContent = this.formatTime(totalSeconds);
      this.playback.disabled = false;
    });
    this.video.addEventListener('timeupdate', () => {
      if (!this.video || !this.playback || !this.currentTime)
        return;
      const currentSeconds = Math.floor(this.video.currentTime);
      this.currentTime.textContent = this.formatTime(currentSeconds);
      this.playback.value = currentSeconds.toString();
    });
    if (this.playback) {
      this.playback.addEventListener('input', () => {
        if (!this.video || !this.playback || !this.currentTime)
          return;
        const newTime = parseInt(this.playback.value);
        this.video.currentTime = newTime;
        this.currentTime.textContent = this.formatTime(newTime);
      });
    }
    this.video.addEventListener("dblclick", () => this.toggleFullscreen());
    this.video.addEventListener('click', () => this.togglePlay());
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.volumeInput.addEventListener('input', () => this.updateVolume());
    this.muteBtn.addEventListener('click', () => {
      this.toggleMute();
    });
    this.fullScreen.addEventListener('click', () => this.toggleFullscreen());
    this.forwardBtn.addEventListener('click', () => this.skip(this.skipAmount));
    this.backwardBtn.addEventListener('click', () => this.skip(-this.skipAmount));
    this.settingBtn.addEventListener('click', () => this.showOptians());
    const speedOptions = this.settingsOptions.querySelectorAll("p");
    speedOptions.forEach(option => {
      option.addEventListener("click", () => {
        const newSpeed = parseFloat(option.getAttribute("data-speed") || "1");
        this.changeSpeed(newSpeed);
      });
    });
  }
  showOptians() {
    var _a;
    (_a = this.settingsOptions) === null || _a === void 0 ? void 0 : _a.classList.toggle("show-settings");
  }
  changeSpeed(newSpeed) {
    if (!this.video)
      return;
    this.video.playbackRate = newSpeed;
  }
  togglePlay() {
    if (!this.video || !this.playBtn)
      return;
    if (document.fullscreenElement)
      return;
    if (this.video.paused) {
      this.video.play();
      this.playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    }
    else {
      this.video.pause();
      this.playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
  }
  skip(seconds) {
    if (!this.video)
      return;
    let newTime = this.video.currentTime + seconds;
    if (newTime < 0) {
      newTime = 0;
    }
    else if (newTime > this.video.duration) {
      newTime = this.video.duration;
    }
    this.video.currentTime = newTime;
  }
  toggleMute() {
    if (!this.video || !this.muteBtn)
      return;
    if (!this.volumeInput)
      return;
    if (this.video.muted) {
      this.volumeInput.value = this.video.volume.toString();
    }
    else {
      this.volumeInput.value = '0';
    }
    this.video.muted = !this.video.muted;
    this.muteBtn.innerHTML = this.video.muted
      ? '<i class="bi bi-volume-mute-fill"></i>'
      : '<i class="bi bi-volume-up-fill"></i>';
  }
  updateVolume() {
    if (!this.video || !this.volumeInput)
      return;
    this.video.volume = parseFloat(this.volumeInput.value);
  }
  formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // Format minutes and seconds as two digits without padStart
    const minuteStr = minutes < 10 ? "0" + minutes : minutes.toString();
    const secondStr = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds.toString();
    return `${minuteStr}:${secondStr}`;
  }
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (!this.video)
        return;
      this.video.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }
  addPlayerStyles() {
    const css = `
    .video-container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: ${this.width};
    }

    video {
      width: 100%;
    }
    .controls-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      color: white;
      align-items: center;
      justify-content: space-between;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .video-container:hover .controls-container {
      opacity: 1;
    }

    .playback-cont {
      display: flex;
      padding: 5px 8px 5px 8px;
    }

    .controls-btns {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 5px 10px 10px 10px;
    }

    .r-btns {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .l-btns {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
    }

    input[type="range"] {
      flex: 1;
      margin: 0 10px;
      cursor: pointer;
    }

    .buffered {
      height: 4px;
      position: absolute;
      background: #555;
      width: 100%;
      top: -8px;
    }

    #buffered-amount {
      height: 100%;
      background-color: #777;
      display: block;
      width: 0;
    }

    .progress {
      height: 4px;
      position: absolute;
      top: -8px;
      width: 100%;
      pointer-events: none;
    }

    #progress-amount {
      height: 100%;
      background-color: #595;
      display: block;
      width: 0;
    }

    #play-btn,
    #forward-btn,
    #backward-btn,
    #fullscreen-btn,
    #mute-btn {
      font-size: 22px;
      padding: 0;
      border: none;
    }

    #play-btn:focus-visible {
      outline: none;
    }

    .volume-controls {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .volume-controls input[type="range"] {
      width: 0;
      opacity: 0;
      transition: width 0.3s ease, opacity 0.3s ease;
    }

    .volume-controls:hover input[type="range"] {
      width: 100px;
      opacity: 1;
    }

    .settings-options {
      position: absolute;
      z-index: 100;
      display: flex;
      background-color: rgba(0, 0, 0);
      bottom: 40px;
      right: 64px;
      min-width: 50px;
      padding: 0px 15px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .show-settings {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .settings-options p {
      cursor: pointer;
      margin: 10px 5px;
    }
    i{
      color: ${this.btnColor};
    }
    i, .playback-cont, .settings-options p {
      font-size: ${this.fontSize};
    }
    .controls-container, .settings-options{
          background: ${this.theme};
    }
  `;
    const bootstrapIcons = document.createElement("link");
    bootstrapIcons.setAttribute("href", "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
    bootstrapIcons.setAttribute("rel", "stylesheet");
    document.head.appendChild(bootstrapIcons);
    const styleTag = document.createElement("style");
    styleTag.textContent = css;
    document.head.appendChild(styleTag);
  }
}

export default VideoPlayer;

