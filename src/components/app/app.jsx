import React from "react";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";

const App = (props) => {

  const renderApp = () => {

    const {handleHeaderClick, selectedFilm} = props;


    if (!selectedFilm) {
      return (
        <Main
          handleHeaderClick={
            (film) => handleHeaderClick(film)
          }/>
      );
    }

    return (
      <MoviePage film={selectedFilm}/>
    );
  };

  const {films} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {renderApp()}
        </Route>
        <Route exact path="/dev-film">
          <MoviePage film={films[0]}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
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
  })).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  selectedFilm: PropTypes.shape({
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
  })
};


export default App;
