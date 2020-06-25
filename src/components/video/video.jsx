import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const VIDEO_WIDTH = `280`;
const VIDEO_HEIGHT = `175`;


class Video extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: false,
      isPaused: false
    };
  }

  componentDidMount() {
    const video = this._videoRef.current;
    const {videoSrc} = this.props;

    video.src = videoSrc;
    video.autoplay = true;

    video.onpause = () =>
      this.setState({isPaused: true, isPlaying: false});

    video.onplay = () =>
      this.setState({isPaused: false, isPlaying: true});

    video.muted = true;
    video.loop = true;
    video.width = VIDEO_WIDTH;
    video.height = VIDEO_HEIGHT;
    video.controls = true;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.muted = null;
    video.loop = null;
    video.width = null;
    video.height = null;
    video.src = ``;
    video.autoplay = null;
    video.control = null;
  }


  render() {
    const {onmouseout} = this.props;

    return (
      <article className="small-movie-card catalog__movies-card">
        <video onMouseLeave={(onmouseout)} ref={this._videoRef}
        />
      </article>
    );
  }
}

Video.propTypes = {
  onmouseout: PropTypes.func.isRequired,
  videoSrc: PropTypes.string.isRequired
};


export default Video;
