import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {film} from "../../mocks/test-mocks";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

configure({
  adapter: new Adapter(),
});


it(`Should head button be pressed`, () => {

  const store = mockStore({
    films: [film],
    promoFilm: film,
    genres: [`Action`, `Comedy`],
    activeFilter: `Action`
  });


  const onHeadClick = jest.fn();

  const main = shallow(
      <BrowserRouter>
        <Provider store={store}>
          <Main
            onHeadClick={onHeadClick}
          />
        </Provider>
      </BrowserRouter>
  );

  const headButtons = main.find(`.small-movie-card__title`);

  headButtons.map((button) =>
    button.simulate(`click`)
  );

  expect(onHeadClick.mock.calls.length).toBe(headButtons.length);
});
