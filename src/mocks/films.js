import {getAvailableGenres} from "../utils.js";

const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const FILM_NAMES = [`Jojo Rabbit`, `Jumanji: The Next Level`, `Avengers: Infinity War`, `Top Gun`, `Birdman or (The Unexpected Virtue of Ignorance)`, `Becky`, `Blitz`, `Harry Potter and the Half-Blood Prince`];
const POSTERS = [`https://images-na.ssl-images-amazon.com/images/I/71DIYFHebjL._AC_SY741_.jpg`, `https://i.pinimg.com/736x/84/d7/a3/84d7a36e7d81fd1d3f3c88fea0012100.jpg`, `https://i.pinimg.com/736x/8c/1e/eb/8c1eebf7a60be8940f9ca753de0dd956.jpg`];
const MOCKTEXT = `Alcatra venison strip steak, ut drumstick sirloin dolore flank ball tip prosciutto tempor ipsum turkey officia jerky.  Leberkas burgdoggen laborum commodo sint, minim fugiat proident tongue ex kielbasa meatball.  Ham hock qui irure ham beef ribs.  Eiusmod nostrud consequat nisi sed ullamco sunt landjaeger pork chop ut tempor pastrami.  Nisi pancetta proident, hamburger porchetta beef ribs ham.","Ut duis chuck, burgdoggen cupidatat sirloin picanha velit qui nisi mollit hamburger kevin irure.  Corned beef doner burgdoggen shoulder, brisket ad in.  Occaecat tri-tip short ribs irure, elit sunt capicola incididunt quis ex sint culpa drumstick dolor pork belly.  Tenderloin alcatra nostrud officia tongue.  Strip steak beef ribs aute hamburger picanha ad.","Tempor meatloaf doner, tongue pork belly short loin adipisicing pork chop in enim spare ribs.  Swine andouille bresaola tempor duis picanha jerky.  Frankfurter corned beef anim dolore, bacon cupim meatball boudin meatloaf.  T-bone pork loin aliqua laborum fugiat sed, pork belly culpa.  Boudin aliqua turkey, ex t-bone tenderloin laborum corned beef reprehenderit pariatur minim burgdoggen.  Labore bresaola cupidatat frankfurter alcatra nulla lorem meatloaf pork belly tongue culpa pork chop sed dolor doner.  Aliqua ribeye voluptate pancetta, quis dolor picanha laborum in tongue drumstick.","Kielbasa irure eiusmod officia landjaeger.  Lorem leberkas t-bone in, ea boudin pork pig.  Ipsum chicken do, picanha nulla lorem magna et ham hock ut cow.  Spare ribs pastrami tail alcatra.  Anim spare ribs corned beef, ut mollit turducken ex drumstick pancetta prosciutto nisi meatball voluptate id pig.","Bresaola in eu ham sint.  Laborum culpa anim enim, picanha cupim occaecat ea brisket pig capicola ut flank tri-tip.  Kielbasa t-bone landjaeger dolore turkey eiusmod cow aute elit cupidatat duis.  Spare ribs kielbasa ullamco biltong jowl picanha dolore filet mignon prosciutto chicken pancetta veniam commodo.  Spare ribs quis id laboris jerky, salami flank do beef ribs kielbasa dolore ham commodo fatback.  Doner capicola ut swine.`;
const GENRES = [`Comedies`, `Crime`, `Documentary`, `Dramas`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thrillers`];
const NAMES = [`Heidy Cotnoir`, `Collen Mcfall`, `Esperanza Scofield`, `Alberto Morales`, `Tuyet Flythe`, `Evan Bays`, `Cherly Frisbee`, `Raye Westo`, `Arla Knisely`, `Daina Bellew`];
const VIDEOS = [`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`, `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`];

const getRandomText = () => {
  const splittedText = MOCKTEXT.split(`.`);
  const result = splittedText.slice(0, getRandomInteger(0, splittedText.length - 1));

  return result.join();
};

const PROMOFILM = {
  name: `BATMAN`,
  genre: `ACTION`,
  date: 2014,
  image: `https://i1.wp.com/eisenhowerlibrary.org/wp-content/uploads/2018/04/Batman-Gotham-by-Gaslight-2018-movie-poster1-220x330.jpg`
};

const setMocks = () => {
  const films = [];

  for (let i = 0; i < 200; i++) {
    films[i] = {
      id: i,
      name: FILM_NAMES[getRandomInteger(0, FILM_NAMES.length - 1)],
      poster: POSTERS[getRandomInteger(0, POSTERS.length - 1)],
      description: getRandomText(),
      year: getRandomInteger(1990, 2019),
      genre: GENRES[getRandomInteger(0, GENRES.length - 1)],
      rating: getRandomInteger(0, 10),
      ratings: getRandomInteger(50, 300),
      director: NAMES[getRandomInteger(0, NAMES.length - 1)],
      starring: NAMES.slice(0, getRandomInteger(1, NAMES.length - 1)).join(),
      video: VIDEOS[getRandomInteger(0, VIDEOS.length - 1)]
    };
  }

  return films;
};

const mock = setMocks();

const availableGenres = getAvailableGenres(mock);

export {mock, availableGenres, PROMOFILM};
