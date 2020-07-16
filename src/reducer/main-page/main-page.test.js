import {reducer, ActionType, ActionCreator} from "./main-page.js";


const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;
const MAX_CARDS_INCREMENT_STEP = 8;

const initialState = {
  activeFilter: DEFAULT_FILTER,
  maxCards: DEFAULT_MAX_CARDS
};


it(`Main Page reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});


it(`Main Page reducer should change active filter correctly`, () => {
  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    maxCards: DEFAULT_MAX_CARDS
  }, {
    type: ActionType.SET_FILTER,
    activeFilter: `Action`,
  })).toEqual({
    activeFilter: `Action`,
    maxCards: DEFAULT_MAX_CARDS
  });

  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    maxCards: DEFAULT_MAX_CARDS
  }, {
    type: ActionType.SET_FILTER,
    activeFilter: `Dramma`,
  })).toEqual({
    activeFilter: `Dramma`,
    maxCards: DEFAULT_MAX_CARDS
  });
});


it(`Main page action creator for setting filter returns correct action`, () => {
  expect(ActionCreator.setActiveFilter(`Action`)).toEqual({
    type: ActionType.SET_FILTER,
    activeFilter: `Action`,
  });
});

it(`Main page reducer should increment max cards correctly`, () => {
  expect(reducer({
    activeFilter: DEFAULT_FILTER,
    maxCards: DEFAULT_MAX_CARDS
  }, {
    type: ActionType.INCREMENT_MAX_CARDS,
  })).toEqual({
    activeFilter: DEFAULT_FILTER,
    maxCards: DEFAULT_MAX_CARDS + MAX_CARDS_INCREMENT_STEP
  });
});

it(`Action creator for max cards returns correct action`, () => {
  expect(ActionCreator.incrementMaxCards()).toEqual({
    type: ActionType.INCREMENT_MAX_CARDS,
  });
});
