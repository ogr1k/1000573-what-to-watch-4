import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.MAIN;

export const getActiveFilter = (state) => {
  return state[NAME_SPACE].activeFilter;
};

export const getMaxCardsCount = (state) => {
  return state[NAME_SPACE].maxCards;
};
