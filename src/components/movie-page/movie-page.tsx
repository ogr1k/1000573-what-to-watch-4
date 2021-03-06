import * as React from "react";
import {connect} from "react-redux";
import {getFilmById, getSameGenreFilms, getIsFilmsFetching} from "../../reducer/data/selector.js";
import {Link} from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import MoviePageInfoBlock from "../movie-page-info-block/movie-page-info-block";
import FilmsList from "../films-list/films-list";
import withActiveTab from "../../hoc/with-active-tab/with-active-tab";
import {AppRoute} from "../../constants.js";
import {AuthorisationStatus} from "../../reducer/user/user.js";
import {Operation} from "../../reducer/data/data.js";
import history from "../../history.js";
import Loader from "../loader/loader";
import {Film} from "../../types";

const WrappedInfoBlock = withActiveTab(MoviePageInfoBlock);

interface Props {
  film: Film;
  authorisationStatus: string;
  sameGenreFilms: Film[];
  changeIsFavourite: (id: number, isFavourite: boolean) => void;
  isFilmsFetching: boolean;
}

const MoviePage: React.FunctionComponent<Props> = (props: Props) => {

  if (props.isFilmsFetching) {
    return <Loader />;
  }

  const {film, authorisationStatus, sameGenreFilms, changeIsFavourite} = props;

  const {backgroundColor, backgroundImage, name, genre, year, id, isFavourite} = film;


  const clickHandler = () => {

    if (authorisationStatus === AuthorisationStatus.AUTH) {
      changeIsFavourite(id, !isFavourite);
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

          <Header authorisationStatus={authorisationStatus} />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>
              <div className="movie-card__buttons">
                <Link className="btn btn--play movie-card__button" to={`${AppRoute.PLAYER}/${id}`}>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Link>
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
                <Link to={`${AppRoute.FILM}/${id}/review`} className="btn movie-card__button">Add review</Link>
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
        <Footer />
      </div>
    </div>

  );

};

const mapStateToProps = (state, ownProps) => {

  const filmId = ownProps.routerProps.match.params.id;

  return {
    film: getFilmById(state, filmId),
    sameGenreFilms: getSameGenreFilms(state, filmId),
    isFilmsFetching: getIsFilmsFetching(state)
  };

};

const mapDispatchToProps = (dispatch) => ({
  changeIsFavourite(id, status) {
    dispatch(Operation.postIsFavourite(id, status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
