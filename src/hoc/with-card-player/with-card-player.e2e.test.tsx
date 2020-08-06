import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withCardPlayer from "./with-card-player";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

const VIDEO_PLAY_DELAY_MSECONDS = 1000;


const Film = (props) => {
  const {children, onCardMouseEnter, onCardMouseLeave} = props;

  return (
    <article onMouseEnter={onCardMouseEnter} onMouseLeave={onCardMouseLeave}>
      {children}
    </article>
  );
};

configure({adapter: new Adapter()});

it(`Checks that HOC's callback starts video`, () => {
  const FilmWrapped = withCardPlayer(Film);
  const wrapper = mount(<FilmWrapped
    film={film}
  />);

  window.HTMLMediaElement.prototype.play = () => Promise.resolve();

  const {videoRef} = wrapper.instance();

  jest.spyOn(videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`article`).simulate(`mouseenter`);

  setTimeout(() => (expect(videoRef.current.play).toHaveBeenCalledTimes(1)), VIDEO_PLAY_DELAY_MSECONDS);
});


it(`Checks that HOC's callback stops video`, () => {
  const FilmWrapped = withCardPlayer(Film);
  const wrapper = mount(<FilmWrapped
    film={film}
  />);

  window.HTMLMediaElement.prototype.pause = noop;
  window.HTMLMediaElement.prototype.load = noop;

  const {videoRef} = wrapper.instance();

  jest.spyOn(videoRef.current, `pause`);
  wrapper.instance().componentDidMount();
  wrapper.find(`article`).simulate(`mouseleave`);

  expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
});
