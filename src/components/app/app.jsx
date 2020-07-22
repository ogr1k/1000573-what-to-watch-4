import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import {Switch, Router, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Operation, AuthorisationStatus} from "../../reducer/user/user.js";
import {getAuthorisationStatus} from "../../reducer/user/selector.js";
import AuthScreen from "../authentification/authentification.jsx";
import history from "../../history.js";
import {AppRoute} from "../../constants.js";


class App extends PureComponent {

  constructor(props) {
    super(props);

    props = this.props;
  }

  renderAuthScreen() {

    const {authorisationStatus, login} = this.props;


    if (authorisationStatus === AuthorisationStatus.AUTH) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <AuthScreen
        onSubmit={login}
      />
    );
  }

  render() {
    const {authorisationStatus} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              authorisationStatus={authorisationStatus}
            />
          </Route>
          <Route exact path={`${AppRoute.FILM}/:id`} component={(props) => <MoviePage filmId={Number(props.match.params.id)}/>}>
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            {this.renderAuthScreen()}
          </Route>
        </Switch>
      </Router>
    );
  }
}

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
    id: PropTypes.number.isRequired,
  }),
  authorisationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    authorisationStatus: getAuthorisationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
