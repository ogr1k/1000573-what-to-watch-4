import * as React from "react";
import history from "../../history.js";
import {AppRoute} from "../../constants.js";
import {Film} from "../../types.js";

interface Props {
  film: Film,
  isPlaying: boolean;
  handleEnter: () => void;
  handleLeave: () => void;
  children: React.ReactNode;
}

const Film: React.FunctionComponent<Props> = (props: Props) => {

    const {film, isPlaying, handleEnter, handleLeave, children} = props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={isPlaying ? null : () => history.push(`${AppRoute.FILM}/${film.id}`)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="small-movie-card__image">
          {children}
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={!isPlaying ? null : () => history.push(`${AppRoute.FILM}/${film.id}`)}>{film.name}</a>
        </h3>
      </article>
    );
}

export default Film;
