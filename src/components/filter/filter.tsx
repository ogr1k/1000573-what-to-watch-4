import * as React from "react";

interface Props {
  onFilterClick: (genre: string) => void;
  genre: string;
  activeFilter: string;
}


const Filter: React.FunctionComponent<Props> = (props: Props) => {
  const {genre, onFilterClick, activeFilter} = props;

  const onFilterClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (genre !== activeFilter) {
      onFilterClick(genre);
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
