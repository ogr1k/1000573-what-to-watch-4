import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PromoFilm = {
  NAME: `BATMAN`,
  GENRE: `ACTION`,
  DATE: 2014,
  IMAGE: `https://i1.wp.com/eisenhowerlibrary.org/wp-content/uploads/2018/04/Batman-Gotham-by-Gaslight-2018-movie-poster1-220x330.jpg`
};

ReactDOM.render(
    <App filmName={PromoFilm.NAME} filmGenre={PromoFilm.GENRE} filmDate={PromoFilm.DATE} filmImage={PromoFilm.IMAGE}/>,
    document.querySelector(`#root`)
);
