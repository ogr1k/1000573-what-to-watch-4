import React from "react";
import PropTypes from "prop-types";

const FilmsList = (props) => {
  const {films, renderFilm, onClick} = props;

  return (<div className="catalog__movies-list">
    {films.map((film, index) =>
      renderFilm(film, onClick, index)
    )}
  </div>);
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  })).isRequired,
  onClick: PropTypes.func.isRequired,
  renderFilm: PropTypes.func.isRequired
};

export default FilmsList;
