import React from "react";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs.jsx";
import PropTypes from "prop-types";


const minutesToHoursMinutes = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = Math.floor(minutes % 60);

  const hDisplay = h > 0 ? `${h}H` : ``;
  const mDisplay = m > 0 ? `${m}M` : ``;

  return `${hDisplay} ${mDisplay}`;
};

const MoviePageDetails = (props) => {

  const {film, activeTab, onClick} = props;
  const {poster, name, id, runTime, genre, year, director, starring} = film;

  return (
    <>
        <div className="movie-card__poster movie-card__poster--big">
          <img src={poster} alt={name} width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          <MoviePageTabs filmId={id} activeTab={activeTab} onClick={onClick}/>
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">

                  {starring.join(`,\n`)}

                </span>
              </p>
            </div>
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{minutesToHoursMinutes(runTime)}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{year}</span>
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

MoviePageDetails.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired
  }),
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MoviePageDetails;
