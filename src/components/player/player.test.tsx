import * as React from "react";
import * as renderer from "react-test-renderer";
import Player from "./player";
import {film} from "../../mocks/test-mocks";

it(`Render Player`, () => {
  const tree = renderer
    .create(<Player film={film} onPlayPauseClick={() => {}} onFullScreenclick={() => {}}
      progress={0} isPlaying={false} duration={10} handleLeave={() => {}}
    >
      <div></div>
    </Player>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
