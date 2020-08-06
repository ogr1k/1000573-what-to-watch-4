import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import AddReview from "./add-review";
import * as Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";
import {film} from "../../mocks/test-mocks"

configure({adapter: new Adapter()});

it(`Should textarea be changed`, () => {
  const mockFunction = jest.fn();

  let evt;

  const review = shallow(
      <AddReview
        onSubmit={() => {}}
        onClick={() => {}}
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
        onClick={() => {}}
        onChange={() => {}}
        film={film}
        isValid={true}
      />
  );

  const form = review.find(`.add-review__form`);

  form.simulate(`submit`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});
