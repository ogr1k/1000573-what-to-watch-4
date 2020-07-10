import Filter from "../filter/filter.jsx";
import React from "react";
import PropTypes from "prop-types";

const ALL_GENRES_FILTER = `All Genres`;

const GenresList = (props) => {

  const {genres, clickHandler, activeFilter} = props;

  return (
    <ul className="catalog__genres-list">
      <Filter genre={ALL_GENRES_FILTER} onClick={clickHandler} activeFilter={activeFilter} />
      {genres.map((genre) => <Filter genre={genre} key={genre} onClick={clickHandler} activeFilter={activeFilter}/>)}
    </ul>
  );
};

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default GenresList;
