import React from "react";
import PropTypes from "prop-types";
import withPlayer from "../../hoc/with-player/with-player.js";
import Film from "../../components/film/film.jsx";

const WrappedFilm = withPlayer(Film);

const FilmsList = (props) => {
  const {films} = props;

  if (!films) {
    return null;
  }

  return (<div className="catalog__movies-list">
    {films.map((film) =>
      <WrappedFilm film={film} key={film.id} />
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
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired
  })).isRequired,
};

export default FilmsList;
