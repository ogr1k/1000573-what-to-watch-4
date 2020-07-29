import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation, FetchStatus} from "./review.js";

const initialState = {
  fetchStatus: ``,
  errorMessage: {}
};


const api = createAPI(() => {});

it(`Review reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});


it(`Reducer should update fetchStatus status by change fetch status`, () => {
  expect(reducer({
    fetchStatus: ``,
  }, {
    type: ActionType.CHANGE_FETCH_STATUS,
    payload: FetchStatus.DONE
  })).toEqual({
    fetchStatus: FetchStatus.DONE,
  });

  expect(reducer({
    fetchStatus: ``,
  }, {
    type: ActionType.CHANGE_FETCH_STATUS,
    payload: FetchStatus.IS_FETCHING
  })).toEqual({
    fetchStatus: FetchStatus.IS_FETCHING,
  });
});

it(`Reducer should update errorMessage by set error`, () => {
  expect(reducer({
    errorMessage: ``,
  }, {
    type: ActionType.SET_ERROR,
    payload: {
      status: 404,
      statusText: `Error`
    }
  })).toEqual({
    errorMessage: {
      status: 404,
      statusText: `Error`
    },
  });
});

it(`Reducer should clean state by clean data`, () => {
  expect(reducer({
    errorMessage: {
      status: 404,
      statusText: `Error`
    },
    fetchStatus: FetchStatus.IS_FETCHING,
  }, {
    type: ActionType.CLEAN_DATA,
  })).toEqual(initialState);
});


it(`Should make a correct API call to /comment/id`, function () {
  const apiMock = new MockAdapter(api);
  const dispatch = jest.fn();
  const loginDataLoader = Operation.postReview({
    comment: `testtext`,
    rating: 1,
  });

  apiMock
        .onPost(`/comment/1`)
        .reply(200);

  return loginDataLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(2);
        });
});
