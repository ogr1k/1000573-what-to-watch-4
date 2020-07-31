import {extend} from "../../utils.js";

const FetchStatus = {
  IS_FETCHING: `IS_FETCHING`,
  DONE: `DONE`
};

const initialState = {
  fetchStatus: ``,
  errorMessage: {}
};

const ActionType = {
  SET_ERROR: `SET_ERROR`,
  CHANGE_FETCH_STATUS: `CHANGE_FETCH_STATUS`,
  CLEAN_DATA: `CLEAN_DATA`
};

const ActionCreator = {
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    payload: error
  }),
  changeFetchStatus: (status) => ({
    type: ActionType.CHANGE_FETCH_STATUS,
    payload: status
  }),
  cleanData: () => {
    return ({
      type: ActionType.CLEAN_DATA
    });
  }
};

const Operation = {
  postReview: (review, id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeFetchStatus(FetchStatus.IS_FETCHING));
    return api.post(`comments/${id}`, {
      rating: review.rating,
      comment: review.comment
    })
    .then(() => {
      dispatch(ActionCreator.changeFetchStatus(FetchStatus.DONE));
    })
    .catch((err) => {
      dispatch(ActionCreator.setError(err.response));
    });
  }
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_ERROR: {
      return extend(state, {
        errorMessage: action.payload,
        fetchStatus: ``
      });
    }
    case ActionType.CHANGE_FETCH_STATUS: {
      return extend(state, {
        fetchStatus: action.payload
      });
    }
    case ActionType.CLEAN_DATA: {
      return extend(state, initialState);
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation, FetchStatus};
