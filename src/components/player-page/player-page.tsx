import * as React from "react";
import withMainPlayer from "../../hoc/with-main-player/with-main-player";
import Player from "../player/player";
import {connect} from "react-redux";
import {getFilmById, getIsFilmsFetching} from "../../reducer/data/selector.js";
import Loader from "../loader/loader";
import { Film } from "../../types.js";


const WrappedPlayer = withMainPlayer(Player);

interface Props {
  film: Film;
  isFilmsFetching?: string;
}

const PlayerPage: React.FunctionComponent<Props> = (props: Props) => {

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

const mapStateToProps = (state, ownProps) => {


  return {
    film: getFilmById(state, ownProps.match.params.id),
    isFilmsFetching: getIsFilmsFetching(state),
  };

};

export default connect(mapStateToProps)(PlayerPage);
