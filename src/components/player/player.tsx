
import * as React from "react";
import {AppRoute} from "../../constants";
import history from "../../history.js";
import {Film} from "../../types";


const ISOSTRING_FIRST_TIME_DIGIT = 11;
const ISOSTRING_TIME_DIGITS_AMOUNT = 8;
const MILLISECONDS_IN_SECOND = 1000;
const PERCANTAGES = 100;

interface Props {
  film: Film;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  onFullScreenclick: () => void;
  children: React.ReactNode;
  progress: number;
  duration: number;
}


const Player: React.FunctionComponent<Props> = (props: Props) => {

  const {children, onPlayPauseClick, progress, film, duration, onFullScreenclick, isPlaying} = props;

  const elapsedTime = new Date((duration - progress) * MILLISECONDS_IN_SECOND).toISOString().substr(ISOSTRING_FIRST_TIME_DIGIT, ISOSTRING_TIME_DIGITS_AMOUNT);

  const togglerPositionInPercantages = progress / duration * PERCANTAGES;

  return (
    <React.Fragment>
      {children}
      <button type="button" className="player__exit" onClick={() => history.push(`${AppRoute.FILM}/${film.id}`)}>Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration} />
            <div className="player__toggler" style={{left: `${togglerPositionInPercantages}%`}}>Toggler</div>
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
    </React.Fragment>
  );
};

export default Player;
