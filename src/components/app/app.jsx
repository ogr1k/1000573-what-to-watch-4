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
import AddReview from "../add-review/add-review.jsx";
import withFormValues from "../../hoc/with-form-values/with-form-values.js";
import MyList from "../my-list/my-list.jsx";

const WrappedAddReview = withFormValues(AddReview);


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
    const {authorisationStatus} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <Main
              authorisationStatus={authorisationStatus}
            />
          </Route>
          <Route exact path={`${AppRoute.FILM}/:id`} component={(props) =>
            <MoviePage routerProps={props} authorisationStatus={authorisationStatus} />
          }/>
          <Route exact path={AppRoute.LOGIN}>
            {this.renderAuthScreen()}
          </Route>
          <Route exact path={`${AppRoute.FILM}/:id/review`} component={WrappedAddReview}/>
          <Route exact path={AppRoute.MYLIST} component={MyList}/>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
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
