import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Film from "./film";

const mock = {
  name: `Jojo Rabbit`,
  poster: ``,
  description: ``,
  director: ``,
  genre: ``,
  rating: 1,
  ratings: 1,
  starring: ``,
  year: 1,
  video: ``,
  id: 1
};


Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should card be mouseentered`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film
        film={mock}
        onClick={() => {}}
        handleEnter={mockFunction}
        handleLeave={() => {}}
        isPlaying={false}
      />
  );

  const filmDiv = filmCard.find(`.small-movie-card`);

  filmDiv.simulate(`mouseenter`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});

it(`Should card be mouseleaved`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film
        film={mock}
        onClick={() => {}}
        handleEnter={() => {}}
        handleLeave={mockFunction}
        isPlaying={true}
      />
  );

  const filmDiv = filmCard.find(`.small-movie-card`);

  filmDiv.simulate(`mouseleave`);

  expect(mockFunction).toHaveBeenCalledTimes(1);
});


it(`Should card click hand data`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film
        film={mock}
        onClick={mockFunction}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        isPlaying={false}
      />
  );

  const movieCard = filmCard.find(`.small-movie-card`);

  movieCard.simulate(`click`);

  expect(mockFunction).toHaveBeenCalledWith(mock);
});
