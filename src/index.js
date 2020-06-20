import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {PROMOFILM} from "./constants";
import FILMS from "./mocks/films.js";

ReactDOM.render(
    <App filmName={PROMOFILM.name} filmGenre={PROMOFILM.genre} filmDate={PROMOFILM.date} filmImage={PROMOFILM.image} films={FILMS}/>,
    document.querySelector(`#root`)
);
