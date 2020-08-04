import {extend} from "../../utils.js";
import {AppRoute} from "../../constants.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";

const AuthorisationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};


const initialState = {
  authorisationStatus: AuthorisationStatus.NO_AUTH,
};

const ActionType = {
  REQUIRED_AUTHORISATION: `REQUIRED_AUTHORISATION`,
};


const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(AppRoute.LOGIN)
      .then(() => {
        dispatch(ActionCreator.requireAuthorisation(AuthorisationStatus.AUTH));
      })
      .catch((err) => {
        if (!err.response) {
          dispatch(DataActionCreator.changeIsServerUvailable());
        }
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(AppRoute.LOGIN, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorisation(AuthorisationStatus.AUTH));
      }).catch((err) => {
        if (!err.response) {
          dispatch(DataActionCreator.changeIsServerUvailable());
        }
      });
  },
};


const ActionCreator = {
  requireAuthorisation: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORISATION,
      payload: status,
    };
  }
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.REQUIRED_AUTHORISATION: {
      return extend(state, {
        authorisationStatus: action.payload,
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation, AuthorisationStatus};
