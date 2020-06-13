import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {FILMS, PROMOFILM} from "./constants";

ReactDOM.render(
    <App filmName={PROMOFILM.name} filmGenre={PROMOFILM.genre} filmDate={PROMOFILM.date} filmImage={PROMOFILM.image} films={FILMS}/>,
    document.querySelector(`#root`)
);
