import * as React from "react";
import * as renderer from "react-test-renderer";
import Player from "./player";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils.js";


it(`Render Player`, () => {
  const tree = renderer
    .create(<Player film={film} onPlayPauseClick={noop} onFullScreenclick={noop}
      progress={0} isPlaying={false} duration={10} handleLeave={noop}
    >
      <div></div>
    </Player>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
