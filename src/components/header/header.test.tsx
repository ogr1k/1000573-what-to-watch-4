import * as React from "react";
import Header from "./header";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";


it(`Render header`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Header authorisationStatus="AUTH"/>
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
