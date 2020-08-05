import * as React from "react";

interface Props {
  clickHandler: (genre: string) => void;
  genre: string;
  activeFilter: string;
}


const Filter: React.FunctionComponent<Props> = (props: Props) => {
  const {genre, clickHandler, activeFilter} = props;

  const onFilterClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (genre !== activeFilter) {
      clickHandler(genre);
    }
  };

  return (
    <li className={`catalog__genres-item ` + (activeFilter === genre ? `catalog__genres-item--active` : ``)}>
      <a href="#" className="catalog__genres-link" onClick={(e) => {
        onFilterClickHandler(e);
      }}>{genre}</a>
    </li>
  );
};

export default Filter;
