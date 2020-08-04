import {extend} from "../../utils.js";
import {AppRoute} from "../../constants.js";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data.js";

const FetchStatus = {
  IS_FETCHING: `IS_FETCHING`,
  DONE: `DONE`
};

const initialState = {
  fetchStatus: ``
};

const ActionType = {
  CHANGE_FETCH_STATUS: `CHANGE_FETCH_STATUS`,
  CLEAN_DATA: `CLEAN_DATA`
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
  }
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
      dispatch(ActionCreator.changeFetchStatus(FetchStatus.DONE));

      if (!err.response) {
        dispatch(DataActionCreator.changeIsServerUvailable());
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
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation, FetchStatus};
