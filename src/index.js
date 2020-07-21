import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import {createAPI} from "./api.js";
import thunk from "redux-thunk";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorisationStatus} from "./reducer/user/user.js";


const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorisation(AuthorisationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

store.dispatch(DataOperation.loadPromoFilm());
store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuth());


ReactDOM.render(
    <Provider Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
