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
  films: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  })).isRequired,
  onClick: PropTypes.func.isRequired
};

export default FilmsList;
