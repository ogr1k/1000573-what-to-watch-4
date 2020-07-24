import React from "react";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs.jsx";


const minutesToHoursMinutes = (minutes) => {
  let h = Math.floor(minutes / 60);
  let m = Math.floor(minutes % 60);

  let hDisplay = h > 0 ? `${h}H` : ``;
  let mDisplay = m > 0 ? `${m}M` : ``;
  return `${hDisplay} ${mDisplay}`;
};

const MoviePageDetails = (props) => {

  const {film, activeTab} = props;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={film.poster} alt={film.name} width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          <MoviePageTabs filmId={film.id} activeTab={activeTab}/>
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{film.director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">

                  {film.starring.map((name, index) => (
                    `${name}${index + 1 === film.starring.length ? `` : `,`}\n`
                  ))}

                </span>
              </p>
            </div>
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{minutesToHoursMinutes(film.runTime)}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{film.genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{film.year}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MoviePageDetails;
