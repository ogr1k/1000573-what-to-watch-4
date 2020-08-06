import * as React from "react";
import MoviePageOverview from "../movie-page-overview/movie-page-overview";
import MoviePageDetails from "../movie-page-details/movie-page-details";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews";
import {TabsNames} from "../../constants.js";
import {InfoBlockCommonProps as Props} from "../../types";

const MoviePageInfoBlock: React.FunctionComponent<Props> = (props: Props) => {

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

export default MoviePageInfoBlock;
