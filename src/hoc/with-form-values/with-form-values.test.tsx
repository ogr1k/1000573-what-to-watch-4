import * as React from "react";
import * as renderer from "react-test-renderer";
import withFormValues from "./with-form-values";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

const MockComponent = () => {
  return (
    <div>
    </div>
  );
};


const MockComponentWrapped = withFormValues(MockComponent);

it(`withFormValues rendered correctly`, () => {


  const tree = renderer.create(
      <MockComponentWrapped fetchStatus="" film={film} postReview={noop} cleanReviewState={noop} />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
