import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {mock, availableGenres} from "./mocks/films.js";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer/reducer.js";
import withSelectedFilm from "../src/hoc/with-selected-film/with-selected-film.js";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {ActionCreator, AuthorizationStatus, Operation} from "./reducer/reducer.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);


store.dispatch(Operation.loadFilms());
store.dispatch(Operation.checkAuth());
store.dispatch(Operation.loadPromoFilm());


const WrappedApp = withSelectedFilm(App);

ReactDOM.render(
    <Provider Provider store={store}>
      <WrappedApp films={mock} genres={availableGenres}/>
    </Provider>,
    document.querySelector(`#root`)
);
