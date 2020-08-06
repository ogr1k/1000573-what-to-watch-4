import * as React from "react";
import * as renderer from "react-test-renderer";
import Authentification from "./authentification";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {noop} from "../../utils";


it(`Render Authentification`, () => {
  const tree = renderer
      .create(
          <Router history={history}>
            <Authentification onSubmit={noop} cleanLoginError={noop}/>
          </Router>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
