import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {mock, availableGenres} from "./mocks/films.js";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";

const PROMOFILM = {
  name: `BATMAN`,
  genre: `ACTION`,
  date: 2014,
  image: `https://i1.wp.com/eisenhowerlibrary.org/wp-content/uploads/2018/04/Batman-Gotham-by-Gaslight-2018-movie-poster1-220x330.jpg`
};

const store = createStore(reducer);

ReactDOM.render(
    <Provider Provider store={store}>
      <App promoFilm={PROMOFILM} films={mock} genres={availableGenres}/>
    </Provider>,
    document.querySelector(`#root`)
);
