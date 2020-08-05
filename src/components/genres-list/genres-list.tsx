import * as React from "react";
import Filter from "../filter/filter";

const ALL_GENRES_FILTER = `All Genres`;
const MAX_GENRES = 9;


interface Props {
  clickHandler: (genre: string) => void;
  genres: string[];
  activeFilter: string;
}


const GenresList: React.FunctionComponent<Props> = (props: Props) => {

  const {genres} = props;

  const slicedGenres = genres.slice(0, MAX_GENRES - 1);

  return (
    <ul className="catalog__genres-list">
      <Filter genre={ALL_GENRES_FILTER} {...props}/>
      {slicedGenres.map((genre) => <Filter genre={genre} key={genre} {...props}/>)}
    </ul>
  );
};

export default GenresList;
