import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";

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

        {TabData.map((tab) => (
          <li className={`movie-nav__item` + (activeTab === tab.slicedPath ? ` movie-nav__item--active` : ``)} key={tab.name}>
            <Link to={`${AppRoute.FILM}/${filmId}${tab.path}`} className="movie-nav__link">{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MoviePageTabs;
