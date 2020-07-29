import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import AddReview from "./add-review.jsx";
import Adapter from "enzyme-adapter-react-16";
import {BrowserRouter} from "react-router-dom";

Enzyme.configure({
  adapter: new Adapter(),
});


const film = {
  "description": `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  "director": `Wes Anderson`,
  "genre": `Adventure`,
  "id": 1,
  "name": `Moonrise Kingdom`,
  "poster": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  "previewImage": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  "rating": 7.9,
  "ratings": 291183,
  "starring": [
    `Jared Gilman`,
    `Kara Hayward`,
    `Bruce Willis`
  ],
  "video": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  "year": 2012,
  "backgroundImage": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
  "backgroundColor": `#D8E3E5`,
  "runTime": 94
};


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
        error={{}}
        isValid={true}
        isFetching={false}
      />
  );

  const textArea = review.find(`.add-review__textarea`);

  textArea.simulate(`change`);

  expect(mockFunction).toHaveBeenNthCalledWith(1, evt);
});


it(`Should radio(star) be clicked`, () => {
  const mockFunction = jest.fn();

  const review = mount(
      <BrowserRouter>
        <AddReview
          onSubmit={() => {}}
          onClick={(e) => {
            mockFunction(e.target.value);
          }}
          onChange={() => {}}
          film={film}
          error={{}}
          isValid={true}
          isFetching={false}
        />
      </BrowserRouter>
  );

  const starValue = `1`;

  const starRadio = review.find(`#star-${starValue}`);

  starRadio.simulate(`click`);

  expect(mockFunction).toHaveBeenNthCalledWith(1, starValue);
});


it(`Should form be submitted`, () => {
  const mockFunction = jest.fn();

  const review = shallow(
      <AddReview
        onSubmit={mockFunction}
        onClick={() => {}}
        onChange={() => {}}
        film={film}
        error={{}}
        isValid={true}
        isFetching={false}
      />
  );

  const form = review.find(`.add-review__form`);

  form.simulate(`submit`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});
