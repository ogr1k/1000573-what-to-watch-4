import React from "react";
import renderer from "react-test-renderer";
import Film from "./film.jsx";

const film = {
  name: `Jojo Rabbit`,
  poster: `https://images-na.ssl-images-amazon.com/images/I/71DIYFHebjL._AC_SY741_.jpg`,
  description: ``,
  director: ``,
  genre: ``,
  rating: 1,
  ratings: 1,
  starring: ``,
  year: 1
};

it(`Render Film`, () => {
  const tree = renderer
    .create(<Film film={film} onClick={() => {}} onmouseover={() => {}}
      onmouseout={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
