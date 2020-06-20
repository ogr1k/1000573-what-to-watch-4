import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Film from "./film";

const mock = {
  name: `Jojo Rabbit`,
  poster: ``
};


Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should card be mouseovered`, () => {
  const mockFunction = jest.fn();

  const filmCard = shallow(
      <Film name={mock.name} image={mock.poster} onClick={() => {}}
        onmouseover={mockFunction}
        onmouseout={() => {}}
      />
  );

  const filmDiv = filmCard.find(`.small-movie-card__image`);

  filmDiv.simulate(`mouseover`);

  expect(mockFunction).toHaveBeenCalledWith(mock.name);
});
