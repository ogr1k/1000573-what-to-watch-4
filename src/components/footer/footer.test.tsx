import * as React from "react";
import Footer from "./footer";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";


it(`Render Footer`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <Footer />
        </BrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
