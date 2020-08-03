import React, {PureComponent, Fragment} from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import PropTypes from "prop-types";


const MAX_RATING = 5;


class AddReview extends PureComponent {

  constructor(props) {
    super(props);
  }


  _renderStars() {

    const result = [];

    for (let i = 0; i <= MAX_RATING; i++) {
      result.push(
          <Fragment key={i}>
            <input className="rating__input" id={`star-${i}`} type="radio" disabled={this.props.isFetching} name="rating" defaultValue={i} defaultChecked={i === 0}/>
            <label className={`rating__label ${i === 0 ? `visually-hidden` : ``}`} htmlFor={`star-${i}`}>Rating ${i}</label>
          </Fragment>
      );
    }

    return result;
  }

  render() {

    const {film, error, onSubmit, onClick, onChange, isValid, isFetching} = this.props;
    const {status, statusText} = error;
    const {name, poster, backgroundImage, id} = film;

    const shouldSubmitButtonBeDisabled = (isFetching || !isValid);


    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="add-review__notice add-review__error">
            {error.status ?
              `${status} server error "${statusText}"`
              : ``}
          </div>
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
                {this._renderStars()}
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
      </section>
    );
  }
}

AddReview.propTypes = {
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired
  }),
  fetchStatus: PropTypes.string,
  error: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default AddReview;
