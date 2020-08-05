import * as React from "react";
import {Link, Redirect} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import {FetchStatus} from "../../reducer/review/review.js";
import {Film} from "../../types.js";
import {InjectedProps} from "../../hoc/with-form-values/with-form-values";


const MAX_RATING = 5;

interface Props extends InjectedProps {
  film: Film;
  errorMessage?: string;
  fetchStatus?: string;
}


const AddReview: React.FunctionComponent<Props> = (props: Props) => {

  if (props.fetchStatus === FetchStatus.DONE) {
    return <Redirect to={`${AppRoute.FILM}/${props.film.id}`} />;
  }

  const renderStars = (isFetching: boolean) => {

    const result = [];

    for (let i = 0; i <= MAX_RATING; i++) {
      result.push(
          <React.Fragment key={i}>
            <input className="rating__input" id={`star-${i}`} type="radio" disabled={isFetching} name="rating" defaultValue={i} defaultChecked={i === 0}/>
            <label className={`rating__label ${i === 0 ? `visually-hidden` : ``}`} htmlFor={`star-${i}`}>Rating ${i}</label>
          </React.Fragment>
      );
    }

    return result;
  }

    const {film, onSubmit, onClick, onChange, isValid, errorMessage, fetchStatus} = props;
    const {name, poster, backgroundImage, id} = film;

    const isFetching = fetchStatus === FetchStatus.IS_FETCHING;

    const shouldSubmitButtonBeDisabled = (isFetching || !isValid);

    return (
      <React.Fragment>
        <div className="error">{errorMessage}</div>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.FILM}/${id}`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
            <div className="user-block">
              <div className="user-block__avatar">
                <img src="/img/avatar.jpg" alt="User avatar" width={63} height={63} />
              </div>
            </div>
          </header>
          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={name} width={218} height={327} />
          </div>
        </div>
        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={(e) => {
            onSubmit(e);
          }}>
            {isValid
              ? ``
              : (<div className="add-review__notice">
          Please fill comment (50-400 symbols) and select rating by click on star
              </div>)}
            <div className="rating">
              <div className="rating__stars" onClick={(e) => {
                onClick(e);
              }}>
                {renderStars(isFetching)}
              </div>
            </div>
            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" disabled={isFetching}
                placeholder="Review text" defaultValue={``} onChange={(e) => {
                  onChange(e);
                }} />
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={shouldSubmitButtonBeDisabled}>Post</button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
}


export default AddReview;
