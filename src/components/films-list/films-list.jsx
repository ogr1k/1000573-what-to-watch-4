import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Film from "../film/film.jsx";

const VIDEO_DELEAY_MSECONDS = 1000;

class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentActiveFilm: ``
    };

    this.timeOut = null;
  }

  _mouseLeaveHandler() {
    clearTimeout(this.timeOut);
    this.setState({currentActiveFilm: ``});

    this.timeOut = null;
  }

  _mouseEnterHandler(name) {
    this.timeOut = setTimeout(() => (this.setState({
      currentActiveFilm: name
    })), VIDEO_DELEAY_MSECONDS);
  }

  _renderCard(film, index) {

    const {currentActiveFilm} = this.state;

    const {onClick} = this.props;

    return <Film
      film={film}
      onClick={onClick}
      key={film.name + index}
      onmouseover={(name) => this._mouseEnterHandler(name)}
      onmouseout={() => this._mouseLeaveHandler()}
      isPlaying={film.name === currentActiveFilm}
    />;
  }


  render() {


    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) =>
          this._renderCard(film, index)
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
