import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReview from "./add-review";
import {BrowserRouter} from "react-router-dom";
import {film} from "../../mocks/test-mocks"


it(`Render Add Review`, () => {

  const tree = renderer
    .create(
        <BrowserRouter>
          <AddReview
        onSubmit={() => {}}
        onClick={() => {}}
        onChange={() => {}}
        film={film}
        isValid={true}
      />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
