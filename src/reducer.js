import {mock, PROMOFILM, availableGenres} from "./mocks/films.js";

const DEFAULT_FILTER = `All Genres`;

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  activeFilter: DEFAULT_FILTER,
  films: mock,
  promoFilm: PROMOFILM,
  genres: availableGenres
};

const ActionType = {
  SET_FILTER: `SET_FILTER`
};


const ActionCreator = {
  setActiveFilter: (activeGenre) => ({
    type: ActionType.SET_FILTER,
    activeFilter: activeGenre
  })
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_FILTER: {
      return extend(state, {
        activeFilter: action.activeFilter,
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType};
