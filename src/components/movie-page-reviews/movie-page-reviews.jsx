import React from "react";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs.jsx";
import PropTypes from "prop-types";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getComments} from "../../reducer/data/selector.js";
import {connect} from "react-redux";
import Review from "../review/review.jsx";

class MoviePageReviews extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadComments(this.props.film.id);
  }

  _renderReviews() {
    const {comments} = this.props;

    if (!comments.length) {
      return null;
    }

    return comments.map((comment) => <Review key={comment.id} comment={comment}/>);
  }

  render() {

    const {activeTab, onClick, film} = this.props;
    const {name, poster} = film;

    return (
    <>
        <div className="movie-card__poster movie-card__poster--big">
          <img src={poster} alt={name} width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          <MoviePageTabs activeTab={activeTab} onClick={onClick}/>
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {this._renderReviews()}
            </div>
          </div>
        </div>
    </>
    );
  }

}

MoviePageReviews.propTypes = {
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
    runTime: PropTypes.number.isRequired
  }),
  activeTab: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })),
  loadComments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => (
  {
    comments: getComments(state)
  }
);

const mapDispatchToProps = (dispatch) => {

  return ({
    loadComments(id) {
      dispatch(DataOperation.loadComments(id));
    }
  });

};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePageReviews);
