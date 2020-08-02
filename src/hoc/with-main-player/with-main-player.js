import React, {PureComponent, createRef} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilmById} from '../../reducer/data/selector.js';


let WithMainForExyme;

const withMainPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
        progress: 0,
        duration: 0
      };

      this.handlePlayOrPauseClick = this.handlePlayOrPauseClick.bind(this);
      this.fullScreenClick = this.fullScreenClick.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;

      if (this.props.film && !video.poster) {
        this._subscribeOnEventsAndAddProperties();
      }
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.film && !video.poster) {
        this._subscribeOnEventsAndAddProperties();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;


      video.poster = ``;
      video.src = ``;
    }

    handlePlayOrPauseClick() {

      if (this.state.isPlaying) {
        this._videoRef.current.pause();
      } else {
        this._videoRef.current.play();
      }

    }

    fullScreenClick() {

      this._videoRef.current.requestFullscreen();
    }

    _subscribeOnEventsAndAddProperties() {

      const video = this._videoRef.current;

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
          {...this.props}
          onPlayPauseClick={this.handlePlayOrPauseClick}
          onFullScreenclick={this.fullScreenClick}
          progress={this.state.progress}
          film={this.props.film}
          duration={this.state.duration}
          isPlaying={this.state.isPlaying}
        >
          <video ref={this._videoRef} className="player__video"/>
        </Component>
      );
    }
  }

  WithPlayer.propTypes = {
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
      id: PropTypes.number.isRequired,
      mainVideo: PropTypes.string
    }),
  };

  WithMainForExyme = WithPlayer;

  const mapStateToProps = (state, ownProps) => {


    return {
      film: getFilmById(state, ownProps.match.params.id)
    };

  };


  return connect(mapStateToProps)(WithPlayer);
};

export {WithMainForExyme};
export default withMainPlayer;
