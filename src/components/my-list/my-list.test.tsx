import * as React from "react";
import * as renderer from "react-test-renderer";
import MyList from "./my-list";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";
import {createAPI} from "../../api.js";
import thunk from 'redux-thunk';
import { film } from "../../mocks/test-mocks";


const api = createAPI(() => {});
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

it(`Render MyList`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      favouriteFilms: [film],
    }
  });

  const tree = renderer
    .create((
      <Provider store={store}>
        <BrowserRouter>
          <MyList />
        </BrowserRouter>
      </Provider>
    ), {
      createNodeMock() {
        return {};
      }
    }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
