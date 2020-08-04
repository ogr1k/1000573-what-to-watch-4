import React from "react";
import PropTypes from "prop-types";
import withMainPlayer from "../../hoc/with-main-player/with-main-player.js";
import Player from "../player/player.jsx";
import {connect} from "react-redux";
import {getFilmById, getIsFilmsFetching} from "../../reducer/data/selector.js";
import Loader from "../loader/loader.jsx";


const WrappedPlayer = withMainPlayer(Player);

const PlayerPage = (props) => {

  const {film, isFilmsFetching} = props;

  if (isFilmsFetching) {
    return <Loader />;
  }

  return (
    <div className="player">
      <WrappedPlayer film={film}/>
    </div>
  );
};

PlayerPage.propTypes = {
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
  isFilmsFetching: PropTypes.bool,
  loadFilmsError: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {


  return {
    film: getFilmById(state, ownProps.match.params.id),
    isFilmsFetching: getIsFilmsFetching(state),
  };

};

export default connect(mapStateToProps)(PlayerPage);
