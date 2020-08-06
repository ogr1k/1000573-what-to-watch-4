import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Film from "./film";
import {film} from "../../mocks/test-mocks"

configure({adapter: new Adapter()});


it(`Should card be mouseentered`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film
        film={film}
        onCardMouseEnter={mockFunction}
        isPlaying={false}
        onCardMouseLeave={() => {}}
      >
        <div></div>
      </Film>
  );

  const filmDiv = filmCard.find(`.small-movie-card`);

  filmDiv.simulate(`mouseenter`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

it(`Should card be mouseleaved`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
  <Film
    film={film}
    onCardMouseEnter={() => {}}
    isPlaying={false}
    onCardMouseLeave={mockFunction}>
    <div></div>
  </Film>
  );

  const filmDiv = filmCard.find(`.small-movie-card`);

  filmDiv.simulate(`mouseleave`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});
