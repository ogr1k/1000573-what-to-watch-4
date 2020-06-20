import React from "react";
import PropTypes from "prop-types";

const Film = (props) => {

  const {name, image, onClick, onmouseover, onmouseout} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image" key={name + Math.round()} onMouseOver={onmouseover} onMouseOut={onmouseout}>
        <img src={image} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title" onClick={onClick}>
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

Film.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onmouseover: PropTypes.func.isRequired,
  onmouseout: PropTypes.func.isRequired,
};

export default Film;
