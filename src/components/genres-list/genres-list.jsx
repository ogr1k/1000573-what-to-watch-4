import Filter from "../filter/filter.jsx";
import React from "react";
import PropTypes from "prop-types";

const ALL_GENRES_FILTER = `All Genres`;
const MAX_GENRES = 9;

const GenresList = (props) => {

  const {genres, clickHandler, activeFilter} = props;

  const slicedGenres = genres.slice(0, MAX_GENRES - 1);

  return (
    <ul className="catalog__genres-list">
      <Filter genre={ALL_GENRES_FILTER} onClick={clickHandler} activeFilter={activeFilter} />
      {slicedGenres.map((genre) => <Filter genre={genre} key={genre} onClick={clickHandler} activeFilter={activeFilter}/>)}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default GenresList;
