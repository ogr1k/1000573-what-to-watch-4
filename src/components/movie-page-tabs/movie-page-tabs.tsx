import * as React from "react";
import {TabsNames} from "../../constants.js";
import { InfoBlockCommonProps } from "../../types.js";


const Tabs = [TabsNames.OVERVIEW, TabsNames.DETAILS, TabsNames.REVIEWS];

interface Props extends Pick<InfoBlockCommonProps, "activeTab" | "onClick">  {
  filmId?: number;
}

const MoviePageTabs: React.FunctionComponent<Props> = (props: Props) => {

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


export default MoviePageTabs;
