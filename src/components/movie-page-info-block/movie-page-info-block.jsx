import React from "react";
import PropTypes from "prop-types";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";

const MoviePageInfoBlock = (props) => {

  const {film, activeTab, clickHandler} = props;

  const renderInfoComponent = () => {

    switch (activeTab) {
      case `Reviews`:
        return <MoviePageReviews film={film} activeTab={activeTab} clickHandler={clickHandler}/>;
      case `Details`:
        return <MoviePageDetails film={film} activeTab={activeTab} clickHandler={clickHandler}/>;
    }

    return <MoviePageOverview film={film} activeTab={activeTab} clickHandler={clickHandler}/>;
  };


  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        {renderInfoComponent()}
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
  clickHandler: PropTypes.func.isRequired
};

export default MoviePageInfoBlock;
