
import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {mock, availableGenres, PROMOFILM} from "./mocks/films.js";

const DEFAULT_FILTER = `All Genres`;

const initialState = {
  activeFilter: DEFAULT_FILTER,
  films: mock,
  promoFilm: PROMOFILM,
  genres: availableGenres
};


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});


it(`Reducer should change active filter correctly`, () => {
  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres
  }, {
    type: ActionType.SET_FILTER,
    activeFilter: `Action`,
  })).toEqual({
    activeFilter: `Action`,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres
  });

  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres
  }, {
    type: ActionType.SET_FILTER,
    activeFilter: `Dramma`,
  })).toEqual({
    activeFilter: `Dramma`,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres
  });
});


it(`Action creator for setting filter returns correct action`, () => {
  expect(ActionCreator.setActiveFilter(`Action`)).toEqual({
    type: ActionType.SET_FILTER,
    activeFilter: `Action`,
  });
});
