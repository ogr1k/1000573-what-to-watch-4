import React, {PureComponent} from 'react';
import Film from "../components/film.jsx";

const VIDEO_DELEAY_MSECONDS = 1000;

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeFilmName: ``,
      };

      this.timeOut = null;
    }

    _mouseLeaveHandler() {
      clearTimeout(this.timeOut);
      this.setState({currentActiveFilm: ``});

      this.timeOut = null;
    }

    _mouseEnterHandler(name) {
      this.timeOut = setTimeout(() => (this.setState({
        currentActiveFilm: name
      })), VIDEO_DELEAY_MSECONDS);
    }

    render() {
      const {activeFilmName} = this.state;

      return <Component
        {...this.props}
        renderFilm={(film, name, clickHandler) => {
          return (
            <Film
              film={film}
              isPlaying={name === activeFilmName}
              onClick={clickHandler}
              onmouseover={(name1) => this._mouseEnterHandler(name1)}
              onmouseout={() => this._mouseLeaveHandler()}
            />
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
