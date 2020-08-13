import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {Operation as DataOperation, ActionCreator as DataActionCreator} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator as UserActionCreator, AuthorisationStatus} from "./reducer/user/user.js";


const onUnauthorized = () => {
  store.dispatch(UserActionCreator.requireAuthorisation(AuthorisationStatus.NO_AUTH));
};

const onServerUnavailable = () => {
  store.dispatch(DataActionCreator.changeIsServerUvailable());
};

const api = createAPI(onUnauthorized, onServerUnavailable);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuth());


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
