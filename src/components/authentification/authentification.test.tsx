import * as React from "react";
import * as renderer from "react-test-renderer";
import Authentification from "./authentification";
import {Router} from "react-router-dom";
import history from "../../history.js";


it(`Render Authentification`, () => {
  const tree = renderer
      .create(
          <Router history={history}>
            <Authentification onSubmit={() => {}} cleanLoginError={() => {}}/>
          </Router>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
