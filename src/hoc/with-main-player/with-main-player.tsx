import * as React from 'react';
import {Film} from '../../types';

interface Props {
  film: Film;
}

interface State {
  isPlaying: boolean;
  progress: number;
  duration: number;
}


const withMainPlayer = (Component) => {
  class WithPlayer extends React.PureComponent<Props, State> {

    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        progress: 0,
        duration: 0
      };

      this.handlePlayOrPauseClick = this.handlePlayOrPauseClick.bind(this);
      this.fullScreenClick = this.fullScreenClick.bind(this);
    }

    componentDidMount() {
      this._subscribeOnEventsAndAddProperties();
    }

    componentWillUnmount() {
      const video = this.videoRef.current;


      video.onloadedmetadata = null;
      video.ontimeupdate = null;
      video.poster = ``;
      video.src = ``;
    }

    handlePlayOrPauseClick() {

      if (this.state.isPlaying) {
        this.videoRef.current.pause();
      } else {
        this.videoRef.current.play();
      }

    }

    fullScreenClick() {

      this.videoRef.current.requestFullscreen();
    }

    _subscribeOnEventsAndAddProperties() {

      const video = this.videoRef.current;

      video.poster = this.props.film.previewImage;
      video.src = this.props.film.mainVideo;

      video.onplay = () => {
        this.setState({
          isPlaying: true
        });
      };

      video.onpause = () => {
        this.setState({
          isPlaying: false
        });
      };

      video.ontimeupdate = () => {
        this.setState({
          progress: Math.floor(video.currentTime)
        });
      };

      video.onloadedmetadata = () => {
        this.setState({
          duration: Math.floor(video.duration)
        });
      };

    }


    render() {

      return (
        <Component
          onPlayPauseClick={this.handlePlayOrPauseClick}
          onFullScreenclick={this.fullScreenClick}
          progress={this.state.progress}
          film={this.props.film}
          duration={this.state.duration}
          isPlaying={this.state.isPlaying}
        >
          <video ref={this.videoRef} className="player__video"/>
        </Component>
      );
    }
  }

  return WithPlayer;
};

export default withMainPlayer;
