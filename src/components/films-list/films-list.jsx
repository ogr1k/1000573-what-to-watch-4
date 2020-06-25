import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Film from "../film/film.jsx";
import Video from "../video/video.jsx";

const VIDEO_DELEAY_MSECONDS = 1000;

class FilmsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentActiveFilm: ``
    };

    this.timeOut = null;
  }

  _mouseOutHandler() {
    clearTimeout(this.timeOut);
    this.setState({currentActiveFilm: ``});

    this.timeOut = null;
  }

  _mouseOverHandler(name) {
    this.timeOut = setTimeout(() => (this.setState({
      currentActiveFilm: name
    })), VIDEO_DELEAY_MSECONDS);
  }

  _renderCard(film) {

    const {onClick} = this.props;

    if (film.name === this.state.currentActiveFilm) {
      return <Video key={film.name} videoSrc={film.video} onmouseout={() => this._mouseOutHandler()}/>;
    } else {
      return <Film film={film} onClick={onClick} key={film.name}
        onmouseover={(name) => this._mouseOverHandler(name)}
        onmouseout={() => this._mouseOutHandler()}
      />;
    }
  }


  render() {


    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) =>
          this._renderCard(film)
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
