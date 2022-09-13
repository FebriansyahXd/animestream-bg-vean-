import { Player, Hls, DefaultUi } from "@vime/react";

import "@vime/core/themes/default.css";
import "@vime/core/themes/light.css";

export default function AnimePlayer({ src }) {
  const hlsConfig = {
    // ...
  };

  return (
    <div>
      <Player
        canAutoplay={() => {
          console.log("ready");
        }}
        theme="dark"
        style={{ "--vm-player-theme": "#e86c8b" }}
        autoplay={true}
      >
        <Hls version="latest" config={hlsConfig}>
          <source data-src={src} type="application/x-mpegURL" />
        </Hls>
        <DefaultUi></DefaultUi>
      </Player>
    </div>
  );
}
