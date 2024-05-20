videojs("cultOfTheLambTrailer", {}, function () {
  const player = this;
  const ratioVolume = 0.3;
  const audioDescription = document.getElementById("audioDescriptionES");

  if (audioDescription) {
    const subsButton = player.controlBar.el_.querySelector(
      ".vjs-subs-caps-button"
    );

    const ADButton = videojs.dom.createEl("button", {
      className:
        "vjs-descriptions-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button",
      title: "Descripción de audio",
    });

    player.controlBar.el_.insertBefore(ADButton, subsButton);

    const divADBButton = document.createElement("div");
    divADBButton.className =
      "vjs-descriptions-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button";
    ADButton.appendChild(divADBButton);

    const spanIcon = document.createElement("span");
    spanIcon.className = "vjs-icon-placeholder";
    divADBButton.appendChild(spanIcon);

    audioDescription.volume = 0;
    player.volume(ratioVolume);

    function toggleAudioDescription() {
      const isDescriptionActive = audioDescription.volume > 0;
      if (isDescriptionActive) {
        audioDescription.volume = 0;
        player.volume(ratioVolume);
      } else {
        audioDescription.volume = 0.6;
        player.volume(0.1);
      }
    }

    ADButton.addEventListener("click", toggleAudioDescription);

    player.on("play", function () {
      if (audioDescription.paused) {
        audioDescription.play();
      }
    });

    player.on("pause", function () {
      if (!audioDescription.paused) {
        audioDescription.pause();
      }
    });

    player.on("ended", function () {
      player.pause();
      audioDescription.pause();
    });

    player.on("volumechange", function () {
      if (audioDescription.volume) {
        player.volume(0.1);
      }
    });

    player.on("timeupdate", function () {
      if (audioDescription.readyState >= 4) {
        const videoTime = Math.ceil(player.currentTime());
        const audioTime = Math.ceil(audioDescription.currentTime);
        if (audioTime !== videoTime) {
          audioDescription.currentTime = player.currentTime();
        }
      }
    });
  }
});
