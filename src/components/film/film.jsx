import React from "react";
import PropTypes from "prop-types";
import Video from "../video/video.jsx";

const Film = (props) => {

  const {film, onClick, onmouseover, onmouseout, isPlaying} = props;

  return (
    <article className="small-movie-card catalog__movies-card" onClick={() => onClick(film)} onMouseEnter={() => onmouseover(film.name)} onMouseLeave={onmouseout}>
      <div className="small-movie-card__image">
        {isPlaying ? <Video videoSrc={film.video} /> : <img src={film.poster} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link">{film.name}</a>
      </h3>
    </article>
  );
};

Film.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    video: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func.isRequired,
  onmouseover: PropTypes.func.isRequired,
  onmouseout: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Film;
