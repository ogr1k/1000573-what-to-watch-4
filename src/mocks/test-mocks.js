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
  year: 1
};

export const films = [];

for (let i = 0; i < FILMS_MOCKS_QUANTITY; i++) {
  films[i] = film;
}
