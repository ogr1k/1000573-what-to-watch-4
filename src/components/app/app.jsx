import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PropTypes from "prop-types";
import {Switch, Router, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Operation, AuthorisationStatus, ActionCreator} from "../../reducer/user/user.js";
import {getAuthorisationStatus, getLoginError} from "../../reducer/user/selector.js";
import AuthScreen from "../authentification/authentification";
import history from "../../history.js";
import {AppRoute} from "../../constants.js";
import AddReviewPage from "../add-review-page/add-review-page";
import MyList from "../my-list/my-list.jsx";
import PlayerPage from "../player-page/player-page.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import Error from "../error/error.tsx";
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
        loginError={this.props.loginError}
        cleanLoginError={this.props.cleanLoginError}
      />
    );
  }

  render() {
    const {authorisationStatus, isServerUvailable} = this.props;

    if (!isServerUvailable) {
      return <Error />;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main authorisationStatus={authorisationStatus}/>
          </Route>
          <Route exact path={`${AppRoute.FILM}/${AppRoute.ID}`} component={(props) =>
            <MoviePage routerProps={props} authorisationStatus={authorisationStatus} />
          }/>
          <Route exact path={AppRoute.LOGIN}>
            {this.renderAuthScreen()}
          </Route>
          <PrivateRoute exact path={`${AppRoute.FILM}/${AppRoute.ID}${AppRoute.REVIEW}`} authorisationStatus={authorisationStatus} component={AddReviewPage}/>
          <PrivateRoute exact path={AppRoute.MYLIST} component={MyList} authorisationStatus={authorisationStatus}/>
          <Route exact path={`${AppRoute.PLAYER}/${AppRoute.ID}`} component={PlayerPage}/>
          <Route >
            <Error notFoundError={true}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorisationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  isServerUvailable: PropTypes.bool.isRequired,
  loginError: PropTypes.string,
  cleanLoginError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    authorisationStatus: getAuthorisationStatus(state),
    loadFilmsError: getLoadFilmsError(state),
    isServerUvailable: getServerError(state),
    loginError: getLoginError(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
  cleanLoginError() {
    dispatch(ActionCreator.cleanLoginError());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
