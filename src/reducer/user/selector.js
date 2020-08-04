import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.USER;

export const getAuthorisationStatus = (state) => {
  return state[NAME_SPACE].authorisationStatus;
};

export const getLoginError = (state) => {

  return state[NAME_SPACE].loginError;
};
