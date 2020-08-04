import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withMainPlayer from "./with-main-player.js";

configure({adapter: new Adapter()});

const film = {
  "description": `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  "director": `Wes Anderson`,
  "genre": `Adventure`,
  "id": 1,
  "name": `Moonrise Kingdom`,
  "poster": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  "previewImage": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  "rating": 7.9,
  "ratings": 291183,
  "starring": [
    `Jared Gilman`,
    `Kara Hayward`,
    `Bruce Willis`
  ],
  "video": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  "year": 2012,
  "backgroundImage": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
  "backgroundColor": `#D8E3E5`,
  "runTime": 94,
  "mainVideo": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

const Player = (props) => {
  const {children, onPlayPauseClick} = props;

  return (
    <article onClick={onPlayPauseClick}>
      <div>
        {children}
      </div>
    </article>
  );
};

Player.propTypes = {
  onPlayPauseClick: PropTypes.func.isRequired,
  onFullScreenclick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isPlaying: PropTypes.bool.isRequired
};


it(`Checks that HOC's main player callback starts video`, () => {

  const PlayerWrapped = withMainPlayer(Player);


  const wrapper = mount(
      <PlayerWrapped film={film}/>
  );

  window.HTMLMediaElement.prototype.play = () => {};

  const instance = wrapper.instance();
  const videoRef = instance._videoRef;

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

  window.HTMLMediaElement.prototype.pause = () => {};

  const instance = wrapper.instance();
  const videoRef = instance._videoRef;

  jest.spyOn(videoRef.current, `pause`);
  instance.setState({
    isPlaying: true
  });

  instance.componentDidMount();

  wrapper.find(`article`).simulate(`click`);

  expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
});
