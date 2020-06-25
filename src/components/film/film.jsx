import React from "react";
import PropTypes from "prop-types";


const Film = (props) => {
  const {film, onClick, onmouseover, onmouseout} = props;

  return (
    <article className="small-movie-card catalog__movies-card" onClick={() => onClick(film)}>
      <div className="small-movie-card__image" onMouseOver={() => onmouseover(film.name)} onMouseOut={onmouseout}>
        <img src={film.poster} alt={film.name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title" onMouseOver={() => onmouseover(film.name)}>
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
    year: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func.isRequired,
  onmouseover: PropTypes.func.isRequired,
  onmouseout: PropTypes.func.isRequired,
};

export default Film;
