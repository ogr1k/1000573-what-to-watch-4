import * as React from "react";
import * as renderer from "react-test-renderer";
import withFormValues from "./with-form-values";
import {film} from "../../mocks/test-mocks";

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};


const MockComponentWrapped = withFormValues(MockComponent);

it(`withFormValues rendered correctly`, () => {


  const tree = renderer.create(
      <MockComponentWrapped fetchStatus="" film={film} postReview={() => {}} cleanReviewState={() => {}} />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
