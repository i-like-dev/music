let currentPlayer = document.getElementById("player");
let volumeSlider = document.getElementById("volume");

fetch("music.json")
  .then(res => res.json())
  .then(data => {
    const playlistDiv = document.getElementById("playlist");
    data.forEach(song => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<strong>${song.title}</strong><br><small>${song.artist}</small>`;
      card.onclick = () => play(song.url);
      playlistDiv.appendChild(card);
    });
  });

function play(url) {
  const embed = convertToEmbed(url);
  currentPlayer.src = embed + "?autoplay=1";
}

function convertToEmbed(url) {
  const videoId = url.split("v=")[1] || url.split("youtu.be/")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

volumeSlider.addEventListener("input", () => {
  const iframe = currentPlayer;
  const vol = volumeSlider.value;
  iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${vol}]}`, "*");
});
