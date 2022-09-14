import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import { SharedState } from "../../App";
import { useNavigate } from "react-router-dom";
import "./CarouselCard.css";
export default function CarouselCard({
  title,
  image,
  episodeNumber,
  rating,
  id,
}) {
  const navigate = useNavigate();
  const animestate = useContext(SharedState);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);

        navigate("/watch/" + res.data.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div
        onClick={() => {
          fetchVideo(id);
        }}
        className="animecard-wrapper"
      >
        <div
          className="animecard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>

        {episodeNumber > 0 && (
          <h5
            className="epnumber"
            style={{
              color: "white",
              fontWeight: "lighter",
              marginTop: 5,
              fontSize: windowSize < 768 ? "1.15rem" : "1.35rem",
            }}
          >
            Episode {episodeNumber}
          </h5>
        )}

        <a href={`/watch/${id}`} className="animecard-title">
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
}
