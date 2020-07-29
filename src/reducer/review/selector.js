import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.REVIEW;

export const getErrorMessage = (state) => {
  return state[NAME_SPACE].errorMessage;
};

export const getFetchStatus = (state) => {
  return state[NAME_SPACE].fetchStatus;
};
