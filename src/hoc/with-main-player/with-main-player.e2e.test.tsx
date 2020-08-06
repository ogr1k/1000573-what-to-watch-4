import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withMainPlayer from "./with-main-player";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

configure({adapter: new Adapter()});

interface Props {
  children: React.ReactNode;
  onPlayPauseClick: () => void;
}

const Player: React.FunctionComponent<Props> = (props: Props) => {
  const {children, onPlayPauseClick} = props;

  return (
    <article onClick={onPlayPauseClick}>
      <div>
        {children}
      </div>
    </article>
  );
};

it(`Checks that HOC's main player callback starts video`, () => {

  const PlayerWrapped = withMainPlayer(Player);


  const wrapper = mount(
      <PlayerWrapped film={film}/>
  );

  window.HTMLMediaElement.prototype.play = () => Promise.resolve();

  const instance = wrapper.instance();
  const videoRef = instance.videoRef;

  jest.spyOn(videoRef.current, `play`);

  instance.componentDidMount();

  wrapper.find(`article`).simulate(`click`);

  expect(videoRef.current.play).toHaveBeenCalledTimes(1);
});

it(`Checks that HOC's main player callback stops video`, () => {

  const PlayerWrapped = withMainPlayer(Player);

  const wrapper = mount(
      <PlayerWrapped film={film}/>
  );

  window.HTMLMediaElement.prototype.pause = noop;

  const instance = wrapper.instance();
  const videoRef = instance.videoRef;

  jest.spyOn(videoRef.current, `pause`);
  instance.setState({
    isPlaying: true
  });

  instance.componentDidMount();

  wrapper.find(`article`).simulate(`click`);

  expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
});
