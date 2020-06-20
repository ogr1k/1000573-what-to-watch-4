import React from "react";
import renderer from "react-test-renderer";
import Film from "./film.jsx";

const film = {
  name: `Jojo Rabbit`,
  poster: ``
};

it(`Render Film`, () => {
  const tree = renderer
    .create(<Film name={film.name} image={film.poster} onClick={() => {}} onmouseover={() => {}}
      onmouseout={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
