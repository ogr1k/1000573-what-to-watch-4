const getRandomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


const MOCKTEXT = `Alcatra venison strip steak, ut drumstick sirloin dolore flank ball tip prosciutto tempor ipsum turkey officia jerky.  Leberkas burgdoggen laborum commodo sint, minim fugiat proident tongue ex kielbasa meatball.  Ham hock qui irure ham beef ribs.  Eiusmod nostrud consequat nisi sed ullamco sunt landjaeger pork chop ut tempor pastrami.  Nisi pancetta proident, hamburger porchetta beef ribs ham.","Ut duis chuck, burgdoggen cupidatat sirloin picanha velit qui nisi mollit hamburger kevin irure.  Corned beef doner burgdoggen shoulder, brisket ad in.  Occaecat tri-tip short ribs irure, elit sunt capicola incididunt quis ex sint culpa drumstick dolor pork belly.  Tenderloin alcatra nostrud officia tongue.  Strip steak beef ribs aute hamburger picanha ad.","Tempor meatloaf doner, tongue pork belly short loin adipisicing pork chop in enim spare ribs.  Swine andouille bresaola tempor duis picanha jerky.  Frankfurter corned beef anim dolore, bacon cupim meatball boudin meatloaf.  T-bone pork loin aliqua laborum fugiat sed, pork belly culpa.  Boudin aliqua turkey, ex t-bone tenderloin laborum corned beef reprehenderit pariatur minim burgdoggen.  Labore bresaola cupidatat frankfurter alcatra nulla lorem meatloaf pork belly tongue culpa pork chop sed dolor doner.  Aliqua ribeye voluptate pancetta, quis dolor picanha laborum in tongue drumstick.","Kielbasa irure eiusmod officia landjaeger.  Lorem leberkas t-bone in, ea boudin pork pig.  Ipsum chicken do, picanha nulla lorem magna et ham hock ut cow.  Spare ribs pastrami tail alcatra.  Anim spare ribs corned beef, ut mollit turducken ex drumstick pancetta prosciutto nisi meatball voluptate id pig.","Bresaola in eu ham sint.  Laborum culpa anim enim, picanha cupim occaecat ea brisket pig capicola ut flank tri-tip.  Kielbasa t-bone landjaeger dolore turkey eiusmod cow aute elit cupidatat duis.  Spare ribs kielbasa ullamco biltong jowl picanha dolore filet mignon prosciutto chicken pancetta veniam commodo.  Spare ribs quis id laboris jerky, salami flank do beef ribs kielbasa dolore ham commodo fatback.  Doner capicola ut swine.`;
const GENRES = [`Horror`, `Sci-Fi`, `Sports`, `War`, `Comedy`, `Horror`, `Romance`];
const NAMES = [`Heidy Cotnoir`, `Collen Mcfall`, `Esperanza Scofield`, `Alberto Morales`, `Tuyet Flythe`, `Evan Bays`, `Cherly Frisbee`, `Raye Westo`, `Arla Knisely`, `Daina Bellew`];

const getRandomText = () => {
  const splittedText = MOCKTEXT.split(`.`);
  const result = splittedText.slice(0, getRandomInteger(0, splittedText.length - 1));

  return result.join();
};

const mock = [
  {name: `Jojo Rabbit`,
    poster: `https://images-na.ssl-images-amazon.com/images/I/71DIYFHebjL._AC_SY741_.jpg`},
  {name: `Jumanji: The Next Level`,
    poster: `https://i.pinimg.com/736x/84/d7/a3/84d7a36e7d81fd1d3f3c88fea0012100.jpg`},
  {name: `Avengers: Infinity War`,
    poster: `https://i.pinimg.com/736x/8c/1e/eb/8c1eebf7a60be8940f9ca753de0dd956.jpg`},
  {name: `Top Gun`,
    poster: `https://images-na.ssl-images-amazon.com/images/I/5111BanI82L._AC_.jpg`},
  {name: `Birdman or (The Unexpected Virtue of Ignorance)`,
    poster: `https://www.kino-teatr.ru/movie/posters/big/9/111029.jpg`},
  {name: `Becky`,
    poster: `https://cdna.artstation.com/p/assets/images/images/027/420/592/large/eddie-holly-becky-poster-lowires-credits.jpg?1591486757`},
  {name: `Blitz`,
    poster: `https://lh3.googleusercontent.com/proxy/00_Ecfny4aIJQ4DchEJPBiYm0cddx6kaef8VDYx-2-0H8Gpm1ib7UC-5xIEZFaCYh_yg39XpadeSB_kos5hzN890seWTBdvRQHHwMW0p2wKw`},
  {name: `Harry Potter and the Half-Blood Prince`,
    poster: `https://images-na.ssl-images-amazon.com/images/I/71Vkd-B5iSL._AC_SX425_.jpg`},
];

const setMockDescription = () => {
  mock.map((element) => {
    element.description = getRandomText();
    element.year = getRandomInteger(1990, 2019);
    element.genre = GENRES[getRandomInteger(0, GENRES.length - 1)];
    element.rating = getRandomInteger(0, 10);
    element.ratings = getRandomInteger(50, 300);
    element.director = NAMES[getRandomInteger(0, NAMES.length - 1)];
    element.starring = NAMES.slice(0, getRandomInteger(1, NAMES.length - 1)).join();
  });

};

setMockDescription();


export default mock;
