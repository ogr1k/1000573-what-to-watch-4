import React from "react";
import renderer from "react-test-renderer";
import PrivateRoute from "./private-route.jsx";
import {BrowserRouter} from "react-router-dom";

const mockProps = {
  "exact": true,
  "path": `/films/:id/review`,
  "authorisationStatus": `AUTH`,
  "location": {
    "pathname": `/films/3/review`,
    "search": ``,
    "hash": ``,
    "key": `h7dlyc`
  },
  "computedMatch": {
    "path": `/films/:id/review`,
    "url": `/films/3/review`,
    "isExact": true,
    "params": {
      "id": `3`
    }
  }
};

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};


it(`PrivateRoute renders component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <PrivateRoute {...mockProps} component={MockComponent}
          />
        </BrowserRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
