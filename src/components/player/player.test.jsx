import React from "react";
import renderer from "react-test-renderer";
import Player from "./player.jsx";

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

it(`Render Player`, () => {
  const tree = renderer
    .create(<Player film={film} onPlayPauseClick={() => {}} onFullScreenclick={() => {}}
      progress={0} isPlaying={false} duration={10}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
