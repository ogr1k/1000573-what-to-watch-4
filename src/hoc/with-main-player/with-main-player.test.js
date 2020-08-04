import React from "react";
import renderer from "react-test-renderer";
import withMainPlayer from "./with-main-player.js";
import {BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";

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


const MockComponent = (props) => {

  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};


const MockComponentWrapped = withMainPlayer(MockComponent);

it(`withMainPlayer rendered correctly`, () => {


  const tree = renderer.create(
      <BrowserRouter>
        <MockComponentWrapped film={film}/>
      </BrowserRouter>, {
        createNodeMock() {
          return {};
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
