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
  video: ``
};


Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should card be mouseovered`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film film={mock} onClick={() => {}}
        onmouseover={mockFunction}
        onmouseout={() => {}}
        isPlaying={false}
      />
  );

  const filmDiv = filmCard.find(`.small-movie-card`);

  filmDiv.simulate(`mouseenter`);

  expect(mockFunction).toHaveBeenCalledWith(mock.name);
});

it(`Should card click hand data`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film film={mock} onClick={mockFunction}
        onmouseover={() => {}}
        onmouseout={() => {}}
        isPlaying={false}
      />
  );

  const movieCard = filmCard.find(`#movie-card-wrapper`);

  movieCard.simulate(`click`);

  expect(mockFunction).toHaveBeenCalledWith(mock);
});
