import * as React from "react";
import withCardPlayer from "../../hoc/with-card-player/with-card-player";
import Film from "../film/film";
import {Film as FilmInterfase} from "../../types";

const WrappedFilm = withCardPlayer(Film);

interface Props {

  films: FilmInterfase[];

}


const FilmsList: React.FunctionComponent<Props> = (props: Props) => {
  const {films} = props;

  if (!films) {
    return null;
  }

  return (<div className="catalog__movies-list">
    {films.map((film) =>
      <WrappedFilm film={film} key={film.id} />
    )}
  </div>);
};

export default FilmsList;
