
import React, {Fragment} from "react";
import {AppRoute} from "../../constants";
import history from "../../history.js";
import PropTypes from "prop-types";

const Player = (props) => {

  const {children, onPlayPauseClick, progress, film, duration, onFullScreenclick, isPlaying} = props;

  const elapsedTime = new Date((duration - progress) * 1000).toISOString().substr(11, 8);
  const togglerPosition = progress / duration * 100;

  return (
    <Fragment>
      {children}
      <button type="button" className="player__exit" onClick={() => history.push(`${AppRoute.FILM}/${film.id}`)}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration} />
            <div className="player__toggler" style={{left: `${togglerPosition}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{elapsedTime}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayPauseClick}>
            {!isPlaying
              ?
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
              </svg>
              :
              <svg viewBox="0 0 14 21" width={14} height={21}>
                <use xlinkHref="#pause" />
              </svg>
            }
          </button>
          <div className="player__name">{film.name}</div>
          <button type="button" className="player__full-screen" onClick={onFullScreenclick}>
            <svg viewBox="0 0 27 27" width={27} height={27}>
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

Player.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    id: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired
  }),
  children: PropTypes.element,
  onPlayPauseClick: PropTypes.func,
  progress: PropTypes.number,
  duration: PropTypes.number,
  onFullScreenclick: PropTypes.func,
  isPlaying: PropTypes.bool,
  isFilmsFetching: PropTypes.bool
};

export default Player;
