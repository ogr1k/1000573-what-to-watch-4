import React from "react";
import {Route, Redirect} from "react-router-dom";
import {AppRoute} from "../../constants";
import {AuthorisationStatus} from "../../reducer/user/user";
import PropTypes from "prop-types";

const PrivateRoute = (props) => {

  const {component: Component, authorisationStatus} = props;

  const rest = Object.assign({}, props);
  delete rest.component;
  delete rest.authorisationStatus;

  return (
    <Route
      {...rest}
      render={(properties) =>
        authorisationStatus === AuthorisationStatus.AUTH ? <Component {...properties} /> : <Redirect to={AppRoute.LOGIN} />
      }
    />
  );


};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
  authorisationStatus: PropTypes.string.isRequired
};


export default PrivateRoute;
