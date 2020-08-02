import React from "react";
import renderer from "react-test-renderer";
import withMainPlayer from "./with-main-player.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";

const mockStore = configureStore([]);


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

  const store = mockStore({
    [NameSpace.DATA]: {
      films: [
        {
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
          "videoMain": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
        }
      ],
    }
  });


  const tree = renderer.create(
      <BrowserRouter>
        <Provider store={store}>
          <MockComponentWrapped match={{
            "params": {
              "id": `1`
            }
          }}/>
        </Provider>
      </BrowserRouter>, {
        createNodeMock() {
          return {};
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
