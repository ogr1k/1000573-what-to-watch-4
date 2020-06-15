import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PROMOFILM = {
  name: `BATMAN`,
  genre: `ACTION`,
  date: 2014,
  image: `https://i1.wp.com/eisenhowerlibrary.org/wp-content/uploads/2018/04/Batman-Gotham-by-Gaslight-2018-movie-poster1-220x330.jpg`
};

const FILMS = [`Jojo Rabbit`, `Jumanji: The Next Level`, `Avengers: Infinity War`, `Top Gun`, `Birdman or (The Unexpected Virtue of Ignorance)`, `Becky`, `Blitz`, `Harry Potter and the Half-Blood Prince`];

ReactDOM.render(
    <App filmName={PROMOFILM.name} filmGenre={PROMOFILM.genre} filmDate={PROMOFILM.date} filmImage={PROMOFILM.image} films={FILMS}/>,
    document.querySelector(`#root`)
);
