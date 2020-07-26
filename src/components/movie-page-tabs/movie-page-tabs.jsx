import React from "react";
import PropTypes from "prop-types";
import {TabsNames} from "../../constants.js";

const Tabs = [TabsNames.OVERVIEW, TabsNames.DETAILS, TabsNames.REVIEWS];


const MoviePageTabs = (props) => {

  const {activeTab, onClick} = props;

  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">

        {Tabs.map((tab) => {

          const isActiveTab = activeTab === tab;

          return (
            <li key={tab}
              className={`movie-nav__item
            ${isActiveTab
              ? `movie-nav__item--active`
              : ``}`}
            >
              <a href="#" className="movie-nav__link" onClick={(e) => {
                e.preventDefault();
                onClick(tab);
              } }>{tab}</a>

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
  onClick: PropTypes.func.isRequired
};

export default MoviePageTabs;
