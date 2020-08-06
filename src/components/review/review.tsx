import * as React from "react";
import {Comment} from "../../types";

interface Props {
  comment: Comment;
}

const formatDate = (date: Date) => {

  const options = {year: `numeric`, month: `long`, day: `numeric`};

  return date.toLocaleString(`en-US`, options);
};

const Review: React.FunctionComponent<Props> = (props: Props) => {

  const {comment} = props;
  const {date, rating, comment: commentText, user} = comment;
  const {name} = user;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{commentText}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>
          <time className="review__date" dateTime={date}>{formatDate(new Date(date))}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};


export default Review;
