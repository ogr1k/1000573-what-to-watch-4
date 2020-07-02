import {mock, PROMOFILM, availableGenres} from "./mocks/films.js";

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;
const MAX_CARDS_INCREMENT_STEP = 8;

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  activeFilter: DEFAULT_FILTER,
  films: mock,
  promoFilm: PROMOFILM,
  genres: availableGenres,
  maxCards: DEFAULT_MAX_CARDS
};

const ActionType = {
  SET_FILTER: `SET_FILTER`,
  INCREMENT_MAX_CARDS: `INCREMENT_MAX_CARDS`
};


const ActionCreator = {
  setActiveFilter: (activeGenre) => ({
    type: ActionType.SET_FILTER,
    activeFilter: activeGenre
  }),
  incrementMaxCards: () => ({
    type: ActionType.INCREMENT_MAX_CARDS,
  })
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_FILTER: {
      return extend(state, {
        activeFilter: action.activeFilter,
        maxCards: DEFAULT_MAX_CARDS
      });
    }
    case ActionType.INCREMENT_MAX_CARDS: {
      return extend(state, {
        maxCards: state.maxCards + MAX_CARDS_INCREMENT_STEP
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType};
