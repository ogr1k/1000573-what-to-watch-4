import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Film from "../film/film.jsx";

class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentActiveFilm: ``
    };
  }


  render() {

    const {films, onClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) =>
          <Film film={film} onClick={onClick} key={index + film.name}
            onmouseover={(name) => (this.setState({
              currentActiveFilm: name
            }))}
            onmouseout={() => (this.setState({currentActiveFilm: ``}))}
          />
        )}
      </div>);
  }
}

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired
};

export default FilmsList;
