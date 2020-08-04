import {extend} from "../../utils.js";
import {AppRoute} from "../../constants.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";

const AuthorisationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};


const initialState = {
  authorisationStatus: AuthorisationStatus.NO_AUTH,
  loginError: ``
};

const ActionType = {
  REQUIRED_AUTHORISATION: `REQUIRED_AUTHORISATION`,
  SET_LOGIN_ERROR: `SET_LOGIN_ERROR`,
  CLEAN_LOGIN_ERROR: `CLEAN_LOGIN_ERROR`
};

const ActionCreator = {
  requireAuthorisation: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORISATION,
      payload: status,
    };
  },
  setLoginError: (err) => {
    return {
      type: ActionType.SET_LOGIN_ERROR,
      payload: err
    };
  },
  cleanLoginError: () =>({
    type: ActionType.CLEAN_LOGIN_ERROR
  })
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
        } else {
          dispatch(ActionCreator.setLoginError(err.response.status));
        }
      });
  },
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.REQUIRED_AUTHORISATION: {
      return extend(state, {
        authorisationStatus: action.payload,
      });
    }
    case ActionType.SET_LOGIN_ERROR: {
      return extend(state, {
        loginError: action.payload,
      });
    }
    case ActionType.CLEAN_LOGIN_ERROR: {
      return extend(state, {
        loginError: ``,
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation, AuthorisationStatus};
