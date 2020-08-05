import * as React from "react";
import FilmsList from "../films-list/films-list";
import GenresList from "../genres-list/genres-list";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/main-page/main-page.js";
import {Operation} from "../../reducer/data/data.js";
import ShowMoreButton from "../show-more-button/show-more-button";
import {getPromoFilm, getFilmsByGenres, getGenres, getIsFavouriteFetching, getIsFilmsFetching} from "../../reducer/data/selector.js";
import {getActiveFilter, getMaxCardsCount} from "../../reducer/main-page/selector.js";
import Header from "../header/header";
import Footer from "../footer/footer";
import history from "../../history.js";
import {AppRoute} from "../../constants.js";
import {AuthorisationStatus} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";
import Loader from "../loader/loader";
import { Film } from "../../types";

interface Props {
  promoFilm: Film;
  films: Film[];
  genres: string[];
  activeFilter: string;
  onFilterClick: (filterName: string) => void;
  onShowMoreButtonClick: () => void;
  maxCards: number;
  authorisationStatus: string;
  changeIsFavourite: (id: number, status: boolean, isPromoFilm: boolean) => void;
  isFavouriteFetching?: boolean;
  isFilmsFetching?: boolean;
}


const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {promoFilm, films, genres, activeFilter, onFilterClick, onShowMoreButtonClick,
    maxCards, authorisationStatus, changeIsFavourite, isFavouriteFetching, isFilmsFetching} = props;

  if (isFilmsFetching) {
    return <Loader />;
  }

  const renderShowMoreButton = () => {

    if (maxCards < films.length) {
      return <ShowMoreButton onClick={onShowMoreButtonClick}/>;
    }

    return null;
  };

  const clickHandler = () => {

    if (authorisationStatus === AuthorisationStatus.AUTH) {
      changeIsFavourite(promoFilm.id, !promoFilm.isFavourite, true);
    } else {
      history.push(AppRoute.LOGIN);
    }
  };

  return (
      <>
      <section className="movie-card">

        <div className="visually-hidden">
          <svg xmlns="http://www.w3.org/2000/svg"><symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859"></polygon>
            </g>
          </symbol><symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7"></path>
          </symbol><symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5"></path>
          </symbol><symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21"></polygon>
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21"></polygon>
            </g>
          </symbol></svg>
        </div>

        <div className="movie-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}></img>
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header authorisationStatus={authorisationStatus}/>
        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={promoFilm.poster} alt={promoFilm.name} width="218" height="327"/>
            </div>
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.year}</span>
              </p>

              <div className="movie-card__buttons">
                <Link className="btn btn--play movie-card__button" to={`${AppRoute.PLAYER}/${promoFilm.id}`}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" disabled={isFavouriteFetching} type="button" onClick={clickHandler}>
                  {promoFilm.isFavourite
                    ? <svg viewBox="0 0 18 14" width={18} height={14}>
                      <use xlinkHref="#in-list" />
                    </svg>
                    : <svg viewBox="0 0 19 20" width={19} height={20}>
                      <use xlinkHref="#add" />
                    </svg>}
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} clickHandler={onFilterClick} activeFilter={activeFilter}/>

          <FilmsList films={films.slice(0, maxCards)} />

          {renderShowMoreButton()}

        </section>
        <Footer />
      </div>
    </>
  );
};


const mapStateToProps = (state) => {


  return {
    activeFilter: getActiveFilter(state),
    films: getFilmsByGenres(state),
    promoFilm: getPromoFilm(state),
    genres: getGenres(state),
    maxCards: getMaxCardsCount(state),
    isFavouriteFetching: getIsFavouriteFetching(state),
    isFilmsFetching: getIsFilmsFetching(state)
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    onFilterClick(filterName) {
      dispatch(ActionCreator.setActiveFilter(filterName));
    },
    onShowMoreButtonClick() {
      dispatch(ActionCreator.incrementMaxCards());
    },
    changeIsFavourite(id, status, isPromoFilm) {
      dispatch(Operation.postIsFavourite(id, status, isPromoFilm));
    }
  };
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
