import NameSpace from "../name-space.js";
import {getActiveFilter} from "../main-page/selector.js";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;

const getFilteredFilms = (activeFilter, films) => {
  if (activeFilter === `All Genres`) {
    return films;
  }

  return films.filter((film) => film.genre === activeFilter);
};

const getAvailableGenres = (films) => {

  const availableGenres = new Set(films.map(film => film.genre))

  return Array.from(availableGenres);
};

const getFilms = (state) => {

  return state[NAME_SPACE].films;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getFilmsByGenres = createSelector(
    getActiveFilter,
    getFilms,
    (resultOne, resultTwo) => {
      return getFilteredFilms(resultOne, resultTwo);
    }
);

export const getGenres = createSelector(
    getFilms,
    (result) => {
      return getAvailableGenres(result);
    }
);
