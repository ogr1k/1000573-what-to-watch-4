
import {reducer, ActionType, ActionCreator} from "./reducer.js";
import {mock, availableGenres, PROMOFILM} from "./mocks/films.js";

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;
const MAX_CARDS_INCREMENT_STEP = 8;

const initialState = {
  activeFilter: DEFAULT_FILTER,
  films: mock,
  promoFilm: PROMOFILM,
  genres: availableGenres,
  maxCards: DEFAULT_MAX_CARDS
};


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});


it(`Reducer should change active filter correctly`, () => {
  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres,
    maxCards: DEFAULT_MAX_CARDS
  }, {
    type: ActionType.SET_FILTER,
    activeFilter: `Action`,
  })).toEqual({
    activeFilter: `Action`,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres,
    maxCards: DEFAULT_MAX_CARDS
  });

  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres,
    maxCards: DEFAULT_MAX_CARDS
  }, {
    type: ActionType.SET_FILTER,
    activeFilter: `Dramma`,
  })).toEqual({
    activeFilter: `Dramma`,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres,
    maxCards: DEFAULT_MAX_CARDS
  });
});


it(`Action creator for setting filter returns correct action`, () => {
  expect(ActionCreator.setActiveFilter(`Action`)).toEqual({
    type: ActionType.SET_FILTER,
    activeFilter: `Action`,
  });
});

it(`Reducer should increment max cards correctly`, () => {
  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres,
    maxCards: DEFAULT_MAX_CARDS
  }, {
    type: ActionType.INCREMENT_MAX_CARDS,
  })).toEqual({
    activeFilter: DEFAULT_FILTER,
    films: mock,
    promoFilm: PROMOFILM,
    genres: availableGenres,
    maxCards: DEFAULT_MAX_CARDS + MAX_CARDS_INCREMENT_STEP
  });
});

it(`Action creator for max cards returns correct action`, () => {
  expect(ActionCreator.incrementMaxCards()).toEqual({
    type: ActionType.INCREMENT_MAX_CARDS,
  });
});
