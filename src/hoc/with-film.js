import React, {PureComponent} from 'react';
import Film from "../components/film/film.jsx";

const VIDEO_DELEAY_MSECONDS = 1000;

const withFilm = (Component) => {
  class WithActiveFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeFilmName: ``,
      };

      this.timeOut = null;
    }

    _mouseLeaveHandler() {
      clearTimeout(this.timeOut);
      this.setState({activeFilmName: ``});
    }

    _mouseEnterHandler(name) {
      this.timeOut = setTimeout(() => (this.setState({
        activeFilmName: name
      })), VIDEO_DELEAY_MSECONDS);
    }

    componentWillUnmount() {
      clearTimeout(this.timeOut);
    }

    render() {
      const {activeFilmName} = this.state;

      return <Component
        {...this.props}

        renderFilm={(film, clickHandler, index) => {
          return (
            <Film
              key={film.name + index}
              film={film}
              isPlaying={film.name === activeFilmName}
              onClick={clickHandler}
              onmouseover={(name) => this._mouseEnterHandler(name)}
              onmouseout={() => this._mouseLeaveHandler()}
            />
          );
        }}
      />;
    }
  }

  WithActiveFilm.propTypes = {};

  return WithActiveFilm;
};

export default withFilm;
