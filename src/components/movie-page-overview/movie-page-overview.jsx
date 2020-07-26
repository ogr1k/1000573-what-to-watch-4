import React from "react";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs.jsx";
import PropTypes from "prop-types";


const getRatingText = (rating) => {
  switch (true) {
    case (rating < 3):
      return `Very bad`;
    case (rating < 5):
      return `Bad`;
    case (rating < 8):
      return `Good`;
    case (rating < 10):
      return `Very good`;
    default:
      return `Awesome`;
  }
};

const MoviePageOverview = (props) => {

  const {film, activeTab, onClick} = props;
  const {poster, id, rating, ratings, description, director, starring, name} = film;


  return (
    <>
        <div className="movie-card__poster movie-card__poster--big">
          <img src={poster} alt={name} width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          <MoviePageTabs filmId={id} activeTab={activeTab} onClick={onClick}/>
          <div className="movie-rating">
            <div className="movie-rating__score">{rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getRatingText(rating)}</span>
              <span className="movie-rating__count">{ratings} ratings</span>
            </p>
          </div>
          <div className="movie-card__text">
            <p>{description}</p>
            <p className="movie-card__director"><strong>Director: {director}</strong></p>
            <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
          </div>
        </div>
    </>
  );
};

MoviePageOverview.propTypes = {
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
  activeTab: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default MoviePageOverview;
