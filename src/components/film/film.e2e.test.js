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
  year: 1
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
      />
  );

  const filmArticle = filmCard.find(`.small-movie-card`);

  filmArticle.simulate(`click`);

  expect(mockFunction).toHaveBeenCalledWith(mock);
});
