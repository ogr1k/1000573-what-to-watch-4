import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";

const VIDEO_PLAY_DELAY_MSECONDS = 1000;
const VIDEO_WIDTH = `280`;
const VIDEO_HEIGHT = `175`;


const withCardPlayer = (Component) => {
  class WithCardPlayer extends PureComponent {
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

    componentDidMount() {
      const video = this._videoRef.current;

      const {film} = this.props;
      const {previewImage} = film;

      video.onplay = () => {

        this.setState({
          isPlaying: true,
        });
      };

      video.onpause = () => {
        this.setState({
          isPlaying: false,
        });
        video.load();
      };

      video.poster = previewImage;

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

    handleLeave() {
      const video = this._videoRef.current;
      video.pause();
      clearTimeout(this.startVideoTimeOut);
    }

    handleEnter() {
      this._videoRef.current.src = this.props.film.video;
      this.startVideoTimeOut = setTimeout(() => (this._videoRef.current.play()), VIDEO_PLAY_DELAY_MSECONDS);
    }


    render() {

      return (
        <Component
          {...this.props}
          handleEnter={this.handleEnter}
          handleLeave={this.handleLeave}
          isPlaying={this.state.isPlaying}
        >
          <video ref={this._videoRef}/>
        </Component>
      );
    }
  }

  WithCardPlayer.propTypes = {
    film: PropTypes.shape({
      name: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      ratings: PropTypes.number.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string).isRequired,
      year: PropTypes.number.isRequired,
      video: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    }).isRequired,
  };

  return WithCardPlayer;
};

export default withCardPlayer;
