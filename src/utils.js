const getAvailableGenres = (films) => {
  const availableGenres = [];

  for (const film of films) {
    if (!availableGenres.includes(film.genre)) {
      availableGenres.push(film.genre);
    }
  }
  return availableGenres;
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const noop = () => {
  // do nothing
};


export {getAvailableGenres, extend, noop};
