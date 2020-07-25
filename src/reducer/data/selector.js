import NameSpace from "../name-space.js";
import {getActiveFilter} from "../main-page/selector.js";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;
const MAX_SAME_GENRES_FILMS_COUNT = 4;

const getFilteredFilms = (activeFilter, films) => {
  if (activeFilter === `All Genres`) {
    return films;
  }

  return films.filter((film) => film.genre === activeFilter);
};

const getAvailableGenres = (films) => {

  const availableGenres = new Set(films.map((film) => film.genre));

  return Array.from(availableGenres);
};

export const getFilms = (state) => {

  return state[NAME_SPACE].films;
};

export const getFilmById = (state, id) => {
  const films = state[NAME_SPACE].films;

  return films.filter((film) => film.id === Number(id))[0];
};

export const getFilmsByGenre = (state, currentActiveFilm) => {
  const films = state[NAME_SPACE].films;

  const sameGenreFilms = films.filter((film) => (film.genre === currentActiveFilm.genre && film.name !== currentActiveFilm.name));

  const getIterationsCount = () => {

    if (sameGenreFilms.length < MAX_SAME_GENRES_FILMS_COUNT) {
      return sameGenreFilms.length;
    }

    return MAX_SAME_GENRES_FILMS_COUNT;
  };

  const iterationsNumber = getIterationsCount();
  const randomSameGenreFilms = [];

  for (let i = 0; i < iterationsNumber; i++) {
    const randomIndex = Math.floor(Math.random() * sameGenreFilms.length);
    randomSameGenreFilms.push(sameGenreFilms[randomIndex]);
    sameGenreFilms.splice(randomIndex, 1);
  }

  return randomSameGenreFilms;
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
