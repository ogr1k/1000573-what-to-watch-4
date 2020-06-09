import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";

const PromoFilm = {
  NAME: `BATMAN`,
  GENRE: `ACTION`,
  DATE: 2014
};

ReactDOM.render(
    <App filmName={PromoFilm.NAME} filmGenre={PromoFilm.GENRE} filmDate={PromoFilm.DATE}/>,
    document.querySelector(`#root`)
);
