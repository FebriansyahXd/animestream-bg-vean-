import { useEffect, useState } from "react";
import GridRenderer from "./GridRenderer.js";

export default function PopularSection() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/meta/anilist/popular")
      .then((response) => response.json())
      .then((data) => {
        setPopular(data.results);
      });
  }, []);
  return (
    <section className="section section-popular" style={{paddingBottom:150}}>
      {popular.length > 0 && (
        <>
          <h1
            style={{ color: "#fdba74", fontSize: "3rem", marginLeft: "35px" }}
          >
            Most Popular
          </h1>
          <GridRenderer api="anilist" finalQuery={popular}></GridRenderer>
        </>
      )}
    </section>
  );
}
