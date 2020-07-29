import React from "react";
import renderer from "react-test-renderer";
import withFormValues from "./with-form-values.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Provider} from "react-redux";

const mockStore = configureStore([]);


const MockComponent = () => {

  return (
    <div>
    </div>
  );
};


const MockComponentWrapped = withFormValues(MockComponent);

it(`withFormValues rendered correctly`, () => {

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
          "runTime": 94
        }
      ],
    },
    [NameSpace.REVIEW]: {
      fetchStatus: ``,
      errorMessage: {}
    }
  });


  const tree = renderer.create(
      <Provider store={store}>
        <MockComponentWrapped match={{
          "path": `/films/:id/review`,
          "url": `/films/1/review`,
          "isExact": true,
          "params": {
            "id": `1`
          }
        }}/>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
