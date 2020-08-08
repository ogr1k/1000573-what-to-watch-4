import * as React from "react";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import {Switch, Router, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Operation, AuthorisationStatus, ActionCreator} from "../../reducer/user/user.js";
import {getAuthorisationStatus, getLoginError} from "../../reducer/user/selector.js";
import AuthScreen from "../authentification/authentification";
import history from "../../history.js";
import {AppRoute} from "../../constants.js";
import AddReviewPage from "../add-review-page/add-review-page";
import MyList from "../my-list/my-list";
import PlayerPage from "../player-page/player-page";
import PrivateRoute from "../private-route/private-route";
import Error from "../error/error";
import {getServerError} from "../../reducer/data/selector.js";


interface Props {
  login: (loginData: {login: string; password: string}) => void;
  authorisationStatus: string;
  isServerAvailable: boolean;
  loginError: number;
  cleanLoginError: () => void;
}

const App: React.FunctionComponent<Props> = (props: Props) => {

  const {authorisationStatus, isServerAvailable, login, loginError, cleanLoginError} = props;

  const renderAuthScreen = () => {

    if (authorisationStatus === AuthorisationStatus.AUTH) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <AuthScreen
        onSubmit={login}
        loginError={loginError}
        cleanLoginError={cleanLoginError}
      />
    );
  };

  if (!isServerAvailable) {
    return <Error />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main authorisationStatus={authorisationStatus}/>
        </Route>
        <Route exact path={`${AppRoute.FILM}/${AppRoute.ID}`} component={(properties) =>
          <MoviePage routerProps={properties} authorisationStatus={authorisationStatus} />
        }/>
        <Route exact path={AppRoute.LOGIN}>
          {renderAuthScreen()}
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
};

const mapStateToProps = (state) => {
  return {
    authorisationStatus: getAuthorisationStatus(state),
    isServerAvailable: getServerError(state),
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
