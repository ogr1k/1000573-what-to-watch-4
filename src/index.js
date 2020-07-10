import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {mock, availableGenres} from "./mocks/films.js";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import withFilm from "../src/hoc/with-selected-film/with-selected-film.js";


const WrappedApp = withFilm(App);

const store = createStore(reducer);

ReactDOM.render(
    <Provider Provider store={store}>
      <WrappedApp films={mock} genres={availableGenres}/>
    </Provider>,
    document.querySelector(`#root`)
);
