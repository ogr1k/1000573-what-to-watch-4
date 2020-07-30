import React from "react";
import UserBlock from "./user-block.jsx";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";


it(`Render User block`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <UserBlock authorisationStatus="AUTH"/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
