import NameSpace from "../name-space.js";
import {getActiveFilter} from "../main/selector.js";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

const getUpdatedFilmsList = (activeFilter, films) => {
  if (activeFilter === `All Genres`) {
    return films;
  }

  return films.filter((film) => film.genre === activeFilter);
};

const getAvailableGenres = (films) => {
  const availableGenres = [];

  for (const film of films) {
    if (!availableGenres.includes(film.genre)) {
      availableGenres.push(film.genre);
    }
  }

  return availableGenres;
};

const getFilmsList = (state) => {

  return state[NAME_SPACE].films;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getFilmsByGenres = createSelector(
    getActiveFilter,
    getFilmsList,
    (resultOne, resultTwo) => {
      return getUpdatedFilmsList(resultOne, resultTwo);
    }
);

export const getGenres = createSelector(
    getFilmsList,
    (result) => {
      return getAvailableGenres(result);
    }
);
