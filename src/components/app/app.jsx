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
import AddReviewPage from "../add-review-page/add-review-page.jsx";
import MyList from "../my-list/my-list.jsx";
import PlayerPage from "../player-page/player-page.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import ServerError from "../server-error/server-error.jsx";
import {getLoadFilmsError, getServerError} from "../../reducer/data/selector.js";

class App extends PureComponent {

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
    const {authorisationStatus, isServerUvailable} = this.props;

    if (!isServerUvailable) {
      return <ServerError />;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main authorisationStatus={authorisationStatus}/>
          </Route>
          <Route exact path={`${AppRoute.FILM}/:id`} component={(props) =>
            <MoviePage routerProps={props} authorisationStatus={authorisationStatus} />
          }/>
          <Route exact path={AppRoute.LOGIN}>
            {this.renderAuthScreen()}
          </Route>
          <PrivateRoute exact path={`${AppRoute.FILM}/:id/review`} authorisationStatus={authorisationStatus} component={AddReviewPage}/>
          <PrivateRoute exact path={AppRoute.MYLIST} component={MyList} authorisationStatus={authorisationStatus}/>
          <Route exact path="/player/:id" component={PlayerPage}/>
          <Route exact path="/dev" component={ServerError}/>
          <Route >
            <ServerError notFoundError={true}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorisationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  isServerUvailable: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    authorisationStatus: getAuthorisationStatus(state),
    loadFilmsError: getLoadFilmsError(state),
    isServerUvailable: getServerError(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
