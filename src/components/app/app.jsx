import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";

// const headClickHandler = () =>{};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clickedFilm: ``
    };
  }

  render() {
    const {filmName, filmGenre, filmDate, filmImage, films} = this.props;

    if (!this.state.clickedFilm) {
      return (
        <Main filmName={filmName} filmGenre={filmGenre} filmDate={filmDate} filmImage={filmImage} films={films}
          onHeadClick={
            (film) => this.setState({
              clickedFilm: film
            })
          }/>
      );
    }

    return (
      <MoviePage film={this.state.clickedFilm}/>
    );
  }
}

App.propTypes = {
  filmName: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmDate: PropTypes.number.isRequired,
  filmImage: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default App;
