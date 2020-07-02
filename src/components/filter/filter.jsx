import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  const {genre, onClick, activeFilter} = props;

  const onFilterClickHandler = (e) => {
    e.preventDefault();
    if (genre !== activeFilter) {
      onClick(genre);
    }
  };

  return (
    <li className={`catalog__genres-item ` + (activeFilter === genre ? `catalog__genres-item--active` : ``)}>
      <a href="#" className="catalog__genres-link" onClick={(e) => {
        onFilterClickHandler(e);
      }}>{genre}</a>
    </li>
  );
};

Filter.propTypes = {
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired
};

export default Filter;
