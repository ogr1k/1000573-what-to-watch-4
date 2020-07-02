import React from "react";
import PropTypes from "prop-types";


const ShowMoreButton = (props) => {
  const {onClick} = props;
  return (

    <div className="catalog__more" onClick={onClick}>
      <button className="catalog__button" type="button">Show more</button>
    </div>

  );
};

ShowMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ShowMoreButton;
