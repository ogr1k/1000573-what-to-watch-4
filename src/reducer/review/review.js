import {extend} from "../../utils.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";
import {AppRoute} from "../../constants.js";

const FetchStatus = {
  IS_FETCHING: `IS_FETCHING`,
  DONE: `DONE`
};

const initialState = {
  fetchStatus: ``,
  errorMessage: ``
};

const ActionType = {
  CHANGE_FETCH_STATUS: `CHANGE_FETCH_STATUS`,
  CLEAN_DATA: `CLEAN_DATA`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`
};

const ActionCreator = {
  changeFetchStatus: (status) => ({
    type: ActionType.CHANGE_FETCH_STATUS,
    payload: status
  }),
  cleanData: () => {
    return ({
      type: ActionType.CLEAN_DATA
    });
  },
  setErrorMessage: (error) => ({
    type: ActionType.SET_ERROR_MESSAGE,
    payload: error
  })
};

const Operation = {
  postReview: (review, id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeFetchStatus(FetchStatus.IS_FETCHING));
    return api.post(`${AppRoute.COMMENTS}/${id}`, {
      rating: review.rating,
      comment: review.comment
    })
    .then(() => {
      dispatch(ActionCreator.changeFetchStatus(FetchStatus.DONE));
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(DataActionCreator.changeIsServerUvailable());
      } else {
        dispatch(ActionCreator.setErrorMessage(err.message));
      }
    });
  }
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.CHANGE_FETCH_STATUS: {
      return extend(state, {
        fetchStatus: action.payload
      });
    }
    case ActionType.CLEAN_DATA: {
      return extend(state, initialState);
    }
    case ActionType.SET_ERROR_MESSAGE: {

      return extend(state, {
        errorMessage: action.payload,
        fetchStatus: ``
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation, FetchStatus};
