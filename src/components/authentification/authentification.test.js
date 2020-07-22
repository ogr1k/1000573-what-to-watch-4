import React from "react";
import renderer from "react-test-renderer";
import Authentification from "./authentification.jsx";


it(`Render Authentification`, () => {
  const tree = renderer
      .create(<Authentification onSubmit={() => {}}
      />)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
