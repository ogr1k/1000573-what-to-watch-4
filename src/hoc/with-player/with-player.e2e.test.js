import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayer from "./with-player.js";

const film = {
  name: `Jojo Rabbit`,
  poster: ``,
  description: ``,
  director: ``,
  genre: ``,
  rating: 1,
  ratings: 1,
  starring: ``,
  year: 1,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  id: 1
};

const VIDEO_PLAY_DELAY_MSECONDS = 1000;

const Film = (props) => {
  const {children, handleEnter, handleLeave} = props;

  return (
    <article onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </article>
  );
};

configure({adapter: new Adapter()});

Film.propTypes = {
  handleEnter: PropTypes.func.isRequired,
  handleLeave: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


it(`Checks that HOC's callback starts video`, () => {
  const FilmWrapped = withPlayer(Film);
  const wrapper = mount(<FilmWrapped
    key={1}
    onClick={() => {}}
    film={film}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  wrapper.find(`article`).simulate(`mouseenter`);

  setTimeout(() => (expect(_videoRef.current.play).toHaveBeenCalledTimes(1)), VIDEO_PLAY_DELAY_MSECONDS);
});


it(`Checks that HOC's callback stops video`, () => {
  const FilmWrapped = withPlayer(Film);
  const wrapper = mount(<FilmWrapped
    key={1}
    onClick={() => {}}
    film={film}
  />);

  window.HTMLMediaElement.prototype.pause = () => {};
  window.HTMLMediaElement.prototype.load = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `pause`);

  wrapper.instance().componentDidMount();

  wrapper.find(`article`).simulate(`mouseleave`);

  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
});
