import React from "react";
import renderer from "react-test-renderer";
import Video from "./video.jsx";

const mock = {
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

it(`Render Video Film Card`, () => {

  const tree = renderer.create(<Video videoSrc={mock.video} onmouseout={() => {}}/>, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
