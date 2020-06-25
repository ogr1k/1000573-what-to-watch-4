import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Video from "./video";

const mock = {
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

const stateMock = {
  isPlaying: false,
  isPaused: false
};

Enzyme.configure({
  adapter: new Adapter(),
});


it(`video component has isPlaying and isPaused states`, () => {
  const video = mount(
      <Video videoSrc={mock.video} onmouseout={() => {}}/>
  );
  const componentInstance = video.instance();
  componentInstance.componentDidMount();

  expect(video.state()).toMatchObject(stateMock);
});
