const getAvailableGenres = (films) => {
  const availableGenres = [];

  for (const film of films) {
    if (!availableGenres.includes(film.genre)) {
      availableGenres.push(film.genre);
    }
  }
  return availableGenres;
};

export {getAvailableGenres};
