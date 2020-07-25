import React from "react";
import PropTypes from "prop-types";

const formatDate = (date) => {

  const options = {year: `numeric`, month: `long`, day: `numeric`};

  return date.toLocaleString(`en-US`, options);
};

const Review = (props) => {

  const {comment} = props;
  const {date, rating, comment: commentText, user} = comment;
  const {name} = user;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{commentText}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime="2016-12-24">{formatDate(new Date(date))}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

Review.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),
};

export default Review;
