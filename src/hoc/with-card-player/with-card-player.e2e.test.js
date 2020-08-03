import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withCardPlayer from "./with-card-player.js";

const film = {
  description: `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
  director: `Sergio Leone`,
  genre: `Crime`,
  id: 1,
  name: `Once Upon a Time in America`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
  rating: 9.9,
  year: 1984,
  ratings: 276395,
  starring: [`Robert De Niro`, `James Woods`, `Elizabeth McGovern`],
  video: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  runTime: 500,
  isFavourite: false,
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
  const FilmWrapped = withCardPlayer(Film);
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
  const FilmWrapped = withCardPlayer(Film);
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
