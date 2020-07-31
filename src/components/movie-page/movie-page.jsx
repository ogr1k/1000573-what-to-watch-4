import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFilmById, getSameGenreFilms} from "../../reducer/data/selector.js";
import {Link} from "react-router-dom";
import UserBlock from "../user-block/user-block.jsx";
import Copyright from "../copyright/copyright.jsx";
import MoviePageInfoBlock from "../movie-page-info-block/movie-page-info-block.jsx";
import FilmsList from "../films-list/films-list.jsx";
import withActiveTab from "../../hoc/with-active-tab/with-active-tab.js";
import {AppRoute} from "../../constants.js";
import {AuthorisationStatus} from "../../reducer/user/user.js";
import {Operation} from "../../reducer/data/data.js";
import history from "../../history.js";

const WrappedInfoBlock = withActiveTab(MoviePageInfoBlock);

const MoviePage = (props) => {

  const {film, authorisationStatus, sameGenreFilms, changeIsFavourite} = props;

  if (!film) {
    return null;
  }

  const {backgroundColor, backgroundImage, name, genre, year, id, isFavourite} = film;


  const clickHandler = () => {

    if (authorisationStatus === AuthorisationStatus.AUTH) {
      changeIsFavourite(id, !isFavourite, true);
    } else {
      history.push(AppRoute.LOGIN);
    }
  };


  return (
    <div>
      <div className="visually-hidden">
        {/* inject:svg */}<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><symbol id="add" viewBox="0 0 19 20">
          {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
          <title>+</title>
          <desc>Created with Sketch.</desc>
          <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859" />
          </g>
        </symbol><symbol id="full-screen" viewBox="0 0 27 27">
          <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
          <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
          <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
          <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
        </symbol><symbol id="in-list" viewBox="0 0 18 14">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5" />
        </symbol><symbol id="pause" viewBox="0 0 14 21">
          {/* Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch */}
          <title>Artboard</title>
          <desc>Created with Sketch.</desc>
          <g id="Artboard" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
            <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
          </g>
        </symbol></svg>{/* endinject */}
      </div>
      <section className="movie-card movie-card--full" style={{
        backgroundColor,
      }
      }>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={AppRoute.ROOT} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>
            <UserBlock authorisationStatus={authorisationStatus} />
          </header>
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>
              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={clickHandler}>
                  {isFavourite
                    ? <svg viewBox="0 0 18 14" width={18} height={14}>
                      <use xlinkHref="#in-list" />
                    </svg>
                    : <svg viewBox="0 0 19 20" width={19} height={20}>
                      <use xlinkHref="#add" />
                    </svg>}
                  <span>My list</span>
                </button>
                <Link to={
                  authorisationStatus === AuthorisationStatus.AUTH
                    ? `${AppRoute.FILM}/${id}/review`
                    : `${AppRoute.LOGIN}`
                } className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>
        <WrappedInfoBlock film={film}/>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={sameGenreFilms}/>
        </section>
        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
          <Copyright />
        </footer>
      </div>
    </div>

  );

};

MoviePage.propTypes = {
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
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    id: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired
  }),
  authorisationStatus: PropTypes.string.isRequired,
  routerProps: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape({
        tab: PropTypes.string
      })
    })
  }),
  sameGenreFilms: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string),
    year: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired
  })),
  changeIsFavourite: PropTypes.func.isRequired
};


const mapStateToProps = (state, ownProps) => {

  const filmId = ownProps.routerProps.match.params.id;

  return {
    film: getFilmById(state, filmId),
    sameGenreFilms: getSameGenreFilms(state, filmId)
  };

};

const mapDispatchToProps = (dispatch) => ({
  changeIsFavourite(id, status) {
    dispatch(Operation.postIsFavourite(id, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
