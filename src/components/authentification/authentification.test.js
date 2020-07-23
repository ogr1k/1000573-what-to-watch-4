import React from "react";
import renderer from "react-test-renderer";
import Authentification from "./authentification.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";


it(`Render Authentification`, () => {
  const tree = renderer
      .create(
          <Router history={history}>
            <Authentification onSubmit={() => {}}/>
          </Router>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
