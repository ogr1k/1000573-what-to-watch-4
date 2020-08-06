import * as React from 'react';
import {Film} from '../../types';

const VIDEO_PLAY_DELAY_MSECONDS = 1000;
const VIDEO_WIDTH = 280;
const VIDEO_HEIGHT = 175;

interface Props {
  film: Film;
}

interface State {
  isPlaying: boolean;
}


const withCardPlayer = (Component) => {

  class WithCardPlayer extends React.PureComponent<Props, State> {

    private videoRef: React.RefObject<HTMLVideoElement>;
    private startVideoTimeOut: ReturnType<typeof setTimeout>;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false
      };

      this.startVideoTimeOut = null;

      this.handleLeave = this.handleLeave.bind(this);
      this.handleEnter = this.handleEnter.bind(this);
    }

    componentDidMount() {
      const video = this.videoRef.current;

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
      const video = this.videoRef.current;

      video.muted = null;
      video.loop = null;
      video.width = null;
      video.height = null;
      video.src = ``;
      clearTimeout(this.startVideoTimeOut);
    }

    handleLeave() {
      const video = this.videoRef.current;
      video.pause();
      clearTimeout(this.startVideoTimeOut);
    }

    handleEnter() {
      this.videoRef.current.src = this.props.film.video;
      this.startVideoTimeOut = setTimeout(() => (this.videoRef.current.play()), VIDEO_PLAY_DELAY_MSECONDS);
    }


    render() {

      return (
        <Component
          film={this.props.film}
          onCardMouseEnter={this.handleEnter}
          onCardMouseLeave={this.handleLeave}
          isPlaying={this.state.isPlaying}
        >
          <video ref={this.videoRef}/>
        </Component>
      );
    }
  }

  return WithCardPlayer;
};

export default withCardPlayer;
