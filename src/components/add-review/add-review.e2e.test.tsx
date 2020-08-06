import * as React from "react";
import {configure, shallow} from "enzyme";
import AddReview from "./add-review";
import * as Adapter from "enzyme-adapter-react-16";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

it(`Should textarea be changed`, () => {
  const mockFunction = jest.fn();

  let evt;

  const review = shallow(
      <AddReview
        onSubmit={noop}
        onClick={noop}
        onChange={(e) => {
          evt = e;
          mockFunction(e);
        }}
        film={film}
        isValid={true}
      />
  );

  const textArea = review.find(`.add-review__textarea`);

  textArea.simulate(`change`);

  expect(mockFunction).toHaveBeenNthCalledWith(1, evt);
});

it(`Should form be submitted`, () => {
  const mockFunction = jest.fn();

  const review = shallow(
      <AddReview
        onSubmit={mockFunction}
        onClick={noop}
        onChange={noop}
        film={film}
        isValid={true}
      />
  );

  const form = review.find(`.add-review__form`);

  form.simulate(`submit`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});
