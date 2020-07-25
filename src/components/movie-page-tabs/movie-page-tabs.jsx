import React from "react";
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
  },
  {
    name: `Reviews`,
    path: AppRoute.REVIEW,
  },
];


const MoviePageTabs = (props) => {

  const {activeTab, clickHandler} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">

        {TabData.map((tab) => {

          const isActiveTab = activeTab === tab.name;

          return (
            <li key={tab.name}
              className={`movie-nav__item
            ${isActiveTab
              ? `movie-nav__item--active`
              : ``}`}
            >
              <a href="#" className="movie-nav__link" onClick={(e) => {
                e.preventDefault();
                clickHandler(tab.name);
              } }>{tab.name}</a>

            </li>
          );
        }
        )}
      </ul>
    </nav>
  );
};


MoviePageTabs.propTypes = {
  activeTab: PropTypes.string,
  clickHandler: PropTypes.func.isRequired
};

export default MoviePageTabs;
