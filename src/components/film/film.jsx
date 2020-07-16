import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class Film extends PureComponent {

  constructor(props) {
    super(props);

  }

  render() {

    const {film, onClick, isPlaying, handleEnter, handleLeave, children} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card"
        onClick={isPlaying ? null : () => onClick(film)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={!isPlaying ? null : () => onClick(film)}>{film.name}</a>
        </h3>
      </article>
    );
  }
}

Film.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    video: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func.isRequired,
  handleEnter: PropTypes.func,
  handleLeave: PropTypes.func,
  isPlaying: PropTypes.bool.isRequired,
  children: PropTypes.object
};

export default Film;
