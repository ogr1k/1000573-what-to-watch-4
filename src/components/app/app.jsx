import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      clickedFilm: ``
    };
  }

  _renderApp() {
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

  render() {
    const {films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage film={films[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  filmName: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmDate: PropTypes.number.isRequired,
  filmImage: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  })).isRequired
};


export default App;
