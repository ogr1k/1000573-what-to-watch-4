import {extend} from "../../utils.js";

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
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorisation(AuthorisationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorisation(AuthorisationStatus.AUTH));
      }).catch((err) => {
        throw err;
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
