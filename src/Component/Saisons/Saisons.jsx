import { useEffect, useState } from "react";
import style from "./Saisons.module.css";
import notfound from "../../assets/image-not-found.jpeg";

export const Seasons = ({ idSerie }) => {
  const [showSeason, setShowSeason] = useState([]);
  const [activeSeasonIndex, setActiveSeasonIndex] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${idSerie}/seasons`)
      .then((res) => res.json())
      .then((data) => setShowSeason(data))
      .catch((err) => console.error(err));
  }, [idSerie]);
  

  
  const toggleSummary = (index) => {
    if (activeSeasonIndex === index) {
      setActiveSeasonIndex(null); // fermer la saison cliquée
    } else {
      setActiveSeasonIndex(index); // ouvrir la saison cliquée
      if (activeSeasonIndex !== null) {
        // fermer la saison précédemment ouverte
        document.querySelectorAll("details")[activeSeasonIndex].removeAttribute("open");
      }
    }
  };



  return (
    <div>
      <hr />
      <div>
        <div className={style.trait}></div>
        <h1>Seasons</h1>
        <ul className={style.seasonsCard}>
          {showSeason?.map((season, index) => (
            <li key={index} className={style.seasonLi} onClick={() => {
                setActiveSeasonIndex(null); // fermer la saison précédente
                toggleSummary(index); // ouvrir la saison cliquée
              }}>
             <details defaultOpen={activeSeasonIndex === index}>

                <summary onClick={() => toggleSummary(index)}>
                  <div className={style.seasonContainer}>
                    <div className={style.imageContainer}>
                      <p className={style.seasonNumber}>Season: {season?.number}</p>
                      <p className={style.seasonName}>{season?.name}</p>
                      <img
                        src={season?.image?.original ?? season?.image?.medium ?? notfound}
                        className={style.affiSeason}
                      />
                    </div>
                  </div>
                </summary>
                <div
                  dangerouslySetInnerHTML={{ __html: season.summary }}
                  className={`${style.resum} ${activeSeasonIndex === index ? "" : style.hidden}`}
                ></div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
