import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";

const headClickHandler = () =>{};


const App = (props) => {
  const {filmName, filmGenre, filmDate, filmImage, films} = props;

  return (
    <Main filmName={filmName} filmGenre={filmGenre} filmDate={filmDate} filmImage={filmImage} films={films} onHeadClick={headClickHandler}/>
  );
};

App.propTypes = {
  filmName: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmDate: PropTypes.number.isRequired,
  filmImage: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default App;
