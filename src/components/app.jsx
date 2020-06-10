import React from "react";
import Main from "./main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {filmName, filmGenre, filmDate, filmImage} = props;

  return (
    <Main filmName={filmName} filmGenre={filmGenre} filmDate={filmDate} filmImage={filmImage}/>
  );
};


export default App;
