import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {AppRoute} from "../../constants";
import {AuthorisationStatus} from "../../reducer/user/user";

type Props = RouteProps & {
  authorisationStatus: string;
  component: React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<Props> = (props: Props) => {

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


export default PrivateRoute;
