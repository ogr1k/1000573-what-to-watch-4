import * as React from "react";
import * as renderer from "react-test-renderer";
import Film from "./film";
import {film} from "../../mocks/test-mocks"


it(`Render Film`, () => {
  const tree = renderer
    .create(<Film film={film} onCardMouseEnter={() => {}}
    onCardMouseLeave={() => {}} isPlaying={false}>
    <div></div>
    </Film>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
