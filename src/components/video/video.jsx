import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const VIDEO_WIDTH = `280`;
const VIDEO_HEIGHT = `175`;
const VIDEO_DELAY_MSECONDS = 1000;


class Video extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: false
    };

    this.timeOut = null;

    this.handleLeave = this.handleLeave.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleLeave() {
    this.setState({isPlaying: false});
    clearTimeout(this.timeOut);
  }

  handleEnter() {
    this.timeOut = setTimeout(() => (this.setState({isPlaying: true})), VIDEO_DELAY_MSECONDS);
  }

  componentDidMount() {

    const video = this._videoRef.current;

    const {film} = this.props;
    const {video: videoSRC, poster} = film;

    video.src = videoSRC;
    video.poster = poster;

    video.muted = true;
    video.loop = true;
    video.width = VIDEO_WIDTH;
    video.height = VIDEO_HEIGHT;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.muted = null;
    video.loop = null;
    video.width = null;
    video.height = null;
    video.src = ``;
    video.autoplay = null;
    clearTimeout(this.timeOut);
  }

  componentDidUpdate() {
    const video = this._videoRef.current;


    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
      video.load();
    }
  }


  render() {

    const {onClick, film} = this.props;

    return (
      <div
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onClick={this.state.isPlaying ? null : () => onClick(film)}
      >
        <video ref={this._videoRef}/>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" onClick={!this.state.isPlaying ? null : () => onClick(film)}>{this.props.film.name}</a>
        </h3>
      </div>
    );
  }
}

Video.propTypes = {
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
  onClick: PropTypes.func.isRequired
};


export default Video;
