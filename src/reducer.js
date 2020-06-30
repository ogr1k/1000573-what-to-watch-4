import {mock, PROMOFILM, availableGenres} from "./mocks/films.js";

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  activeFilter: `All Genres`,
  films: mock,
  promoFilm: PROMOFILM,
  genres: availableGenres
};


const ActionCreator = {
  setActiveFilter: (activeGenre) => ({
    type: `SET_FILTER`,
    activeFilter: activeGenre
  })
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case `SET_FILTER`: {
      return extend(state, {
        activeFilter: action.activeFilter,
      });
    }
  }

  return state;
};


export {reducer, ActionCreator};
