import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  const {genre, onClick, activeFilter} = props;


  return (
    <li className={`catalog__genres-item ` + (activeFilter === genre ? `catalog__genres-item--active` : ``)}>
      <a href="#" className="catalog__genres-link" onClick={(e) => {
        e.preventDefault();
        if (e.target.textContent !== activeFilter) {
          onClick(e.target.textContent);
        }
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
