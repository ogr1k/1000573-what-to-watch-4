import {getAvailableGenres} from "../utils.js";

const FILMS_MOCKS_QUANTITY = 8;

export const PROMOFILM = {
  name: `BATMAN`,
  genre: `ACTION`,
  date: 2014,
  image: `https://i1.wp.com/eisenhowerlibrary.org/wp-content/uploads/2018/04/Batman-Gotham-by-Gaslight-2018-movie-poster1-220x330.jpg`
};

export const film = {
  name: `Jojo Rabbit`,
  poster: ``,
  description: ``,
  director: ``,
  genre: ``,
  rating: 1,
  ratings: 1,
  starring: ``,
  year: 1,
  video: ``,
};

export const films = [];

for (let i = 0; i < FILMS_MOCKS_QUANTITY; i++) {
  const copiedFilm = Object.assign({}, film);
  copiedFilm.id = i;

  films[i] = copiedFilm;
}

export const availableGenres = getAvailableGenres(films);
