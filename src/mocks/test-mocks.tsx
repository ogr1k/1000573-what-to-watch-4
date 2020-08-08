import {getAvailableGenres} from "../utils.js";
import {Film} from "../types.js";

const FILMS_MOCKS_QUANTITY = 8;

export const film: (Film) = {
  description: `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
  director: `Sergio Leone`,
  genre: `Crime`,
  id: 1,
  name: `Once Upon a Time in America`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
  rating: 10,
  year: 1984,
  ratings: 276395,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
  backgroundColor: `#fff`,
  starring: [`Robert De Niro`, `James Woods`, `Elizabeth McGovern`],
  runTime: 500,
  mainVideo: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  isFavourite: false,
  video: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
};

export const films = [];

for (let i = 0; i < FILMS_MOCKS_QUANTITY; i++) {
  const copiedFilm = Object.assign({}, film);
  copiedFilm.id = i;

  films[i] = copiedFilm;
}

export const availableGenres = getAvailableGenres(films);
