import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const VIDEO_WIDTH = `280`;
const VIDEO_HEIGHT = `175`;
const VIDEO_DELAY_MSECONDS = 1000;


const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: false
      };

      this.startVideoTimeOut = null;

      this.handleLeave = this.handleLeave.bind(this);
      this.handleEnter = this.handleEnter.bind(this);
    }

    handleLeave() {
      this.setState({isPlaying: false});
      clearTimeout(this.startVideoTimeOut);
    }

    handleEnter() {
      this.startVideoTimeOut = setTimeout(() => (this.setState({isPlaying: true})), VIDEO_DELAY_MSECONDS);
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
      clearTimeout(this.startVideoTimeOut);
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

      const {onClick} = this.props;

      return (
        <Component
          {...this.props}
          onClick={onClick}
          handleEnter={this.handleEnter}
          handleLeave={this.handleLeave}
          isPlaying={this.state.isPlaying}
        >
          <video ref={this._videoRef}/>
        </Component>
      );
    }
  }

  WithPlayer.propTypes = {
    onClick: PropTypes.func.isRequired,
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
    }).isRequired,
  };

  return WithPlayer;
};

export default withPlayer;
