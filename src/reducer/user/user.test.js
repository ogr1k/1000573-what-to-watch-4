import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation, AuthorisationStatus} from "./user.js";


const api = createAPI(() => {});

it(`User reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    authorisationStatus: AuthorisationStatus.NO_AUTH,
    loginError: ``
  });
});


it(`Reducer should update authorisation status by require authorisation`, () => {
  expect(reducer({
    authorisationStatus: AuthorisationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORISATION,
    payload: AuthorisationStatus.AUTH,
  })).toEqual({
    authorisationStatus: AuthorisationStatus.AUTH,
  });

  expect(reducer({
    authorisationStatus: AuthorisationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORISATION,
    payload: AuthorisationStatus.NO_AUTH,
  })).toEqual({
    authorisationStatus: AuthorisationStatus.NO_AUTH,
  });
});

it(`Reducer should update loginError by setLoginError`, () => {
  expect(reducer({
    loginError: ``,
  }, {
    type: ActionType.SET_LOGIN_ERROR,
    payload: 400,
  })).toEqual({
    loginError: 400,
  });
});

it(`Reducer should clean loginError by cleanLoginError`, () => {
  expect(reducer({
    loginError: 400,
  }, {
    type: ActionType.CLEAN_LOGIN_ERROR
  })).toEqual({
    loginError: ``,
  });
});


it(`Should make a correct API call to /login`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const loginDataLoader = Operation.login({
    login: `test@gmail.com`,
    password: 123,
  });

  apiMock
        .onPost(`/login`)
        .reply(200);

  return loginDataLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(1);
        });
});
