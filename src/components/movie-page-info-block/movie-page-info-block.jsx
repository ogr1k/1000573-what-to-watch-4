import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import {TabsNames} from "../../constants.js";

const MoviePageInfoBlock = (props) => {

  const {film, activeTab, onClick} = props;


  const getInfoComponent = () => {

    switch (activeTab) {
      case TabsNames.REVIEWS:
        return MoviePageReviews;
      case TabsNames.DETAILS:
        return MoviePageDetails;
      case TabsNames.OVERVIEW:
        return MoviePageOverview;
    }

    return null;
  };

  const Info = getInfoComponent();

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <Info film={film} activeTab={activeTab} onClick={onClick}/>
      </div>
    </div>

  );
};

MoviePageInfoBlock.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired
  }),
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default MoviePageInfoBlock;
