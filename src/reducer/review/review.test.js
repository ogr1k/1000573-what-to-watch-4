import {reducer, ActionType, FetchStatus} from "./review.js";

const initialState = {
  fetchStatus: ``,
};

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

it(`Reducer should clean state by clean data`, () => {
  expect(reducer({
    fetchStatus: FetchStatus.IS_FETCHING,
  }, {
    type: ActionType.CLEAN_DATA,
  })).toEqual(initialState);
});
