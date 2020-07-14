import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {mock, availableGenres} from "./mocks/films.js";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import withSelectedFilm from "../src/hoc/with-selected-film/with-selected-film.js";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);


store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadPromoFilm());


const WrappedApp = withSelectedFilm(App);

ReactDOM.render(
    <Provider Provider store={store}>
      <WrappedApp films={mock} genres={availableGenres}/>
    </Provider>,
    document.querySelector(`#root`)
);
