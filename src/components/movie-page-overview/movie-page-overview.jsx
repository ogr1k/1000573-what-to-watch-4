import React from "react";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs.jsx";

const getRatingText = (rating) => {
  switch (true) {
    case (rating < 3):
      return `Very bad`;
    case (rating <= 5):
      return `Bad`;
    case (rating < 7):
      return `Good`;
    case (rating >= 7):
      return `Very good`;
  }

  return null;
};

const MoviePageOverview = (props) => {

  const {film, activeTab} = props;

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={film.poster} alt="The Grand Budapest Hotel poster" width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          < MoviePageTabs filmId={film.id} activeTab={activeTab}/>
          <div className="movie-rating">
            <div className="movie-rating__score">{film.rating}</div>
            <p className="movie-rating__meta">
              <span className="movie-rating__level">{getRatingText(film.rating)}</span>
              <span className="movie-rating__count">{film.ratings} ratings</span>
            </p>
          </div>
          <div className="movie-card__text">
            <p>{film.description}</p>
            <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
            <p className="movie-card__starring"><strong>Starring: {film.starring.join(`, `)} and other</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePageOverview;
