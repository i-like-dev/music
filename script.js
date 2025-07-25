let player;
let musicData = JSON.parse(localStorage.getItem("musicData")) || [];
let password = "0910";

function login() {
  const input = document.getElementById("password").value;
  if (input === password) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("admin").classList.remove("hidden");
    renderAdminList();
  } else {
    Swal.fire("錯誤", "密碼錯誤", "error");
  }
}

function addSong() {
  const url = document.getElementById("videoUrl").value;
  const title = document.getElementById("videoTitle").value;
  const videoId = extractVideoId(url);
  if (videoId && title) {
    musicData.push({ title, videoId });
    localStorage.setItem("musicData", JSON.stringify(musicData));
    renderAdminList();
    renderPlaylist();
  } else {
    Swal.fire("錯誤", "請輸入有效連結與標題", "warning");
  }
}

function extractVideoId(url) {
  const match = url.match(/(?:youtube\.com.*[\?&]v=|youtu\.be\/)([^&#]+)/);
  return match ? match[1] : null;
}

function renderAdminList() {
  const list = document.getElementById("songList");
  list.innerHTML = "";
  musicData.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title}`;
    li.onclick = () => {
      musicData.splice(index, 1);
      localStorage.setItem("musicData", JSON.stringify(musicData));
      renderAdminList();
      renderPlaylist();
    };
    list.appendChild(li);
  });
}

function renderPlaylist() {
  const playlist = document.getElementById("playlist");
  playlist.innerHTML = "";
  musicData.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song";
    div.textContent = song.title;
    div.onclick = () => playVideo(song.videoId);
    playlist.appendChild(div);
  });
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("ytplayer", {
    height: "360",
    width: "640",
    videoId: "",
    events: {
      onReady: () => renderPlaylist()
    }
  });
}

function playVideo(videoId) {
  if (player && player.loadVideoById) {
    player.loadVideoById(videoId);
  }
}
