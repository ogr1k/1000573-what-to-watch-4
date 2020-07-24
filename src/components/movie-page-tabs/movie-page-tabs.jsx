import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import PropTypes from "prop-types";

const TabData = [
  {
    name: `Overview`,
    path: ``
  },
  {
    name: `Details`,
    path: AppRoute.DETAILS,
    slicedPath: AppRoute.DETAILS.slice(1)
  },
  {
    name: `Reviews`,
    path: AppRoute.REVIEW,
    slicedPath: AppRoute.REVIEW.slice(1)
  },
];


const MoviePageTabs = (props) => {

  const {filmId, activeTab} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">

        {TabData.map((tab) => {

          const isActiveTab = activeTab === tab.slicedPath;

          return (
            <li key={tab.name}
              className={`movie-nav__item
            ${isActiveTab
              ? `movie-nav__item--active`
              : ``}`}
            >
              <Link to={`${AppRoute.FILM}/${filmId}${tab.path}`} className={`movie-nav__link
            ${isActiveTab
              ? `disabled-link`
              : ``}`}>{tab.name}</Link>
            </li>
          );
        }
        )}
      </ul>
    </nav>
  );
};


MoviePageTabs.propTypes = {
  filmId: PropTypes.number.isRequired,
  activeTab: PropTypes.string
};

export default MoviePageTabs;
