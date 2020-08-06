import * as React from "react";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {getComments} from "../../reducer/data/selector.js";
import {connect} from "react-redux";
import Review from "../review/review";
import {InfoBlockCommonProps, Comment} from "../../types";


interface Props extends InfoBlockCommonProps {
  loadComments: (id: number) => void;
  comments: Comment[];
}

class MoviePageReviews extends React.PureComponent<Props> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadComments(this.props.film.id);
  }

  _renderReviews(comments: Comment[]) {
    if (!comments.length) {
      return null;
    }

    return comments.map((comment: Comment) => <Review key={comment.id} comment={comment}/>);
  }

  render() {

    const {activeTab, onClick, film, comments} = this.props;
    const {name, poster} = film;

    const middleCommentsIndex = Math.ceil(comments.length / 2);
    const firstPartComments = comments.slice(0, middleCommentsIndex);
    const secondPartComments = comments.slice(middleCommentsIndex);

    return (
      <>
        <div className="movie-card__poster movie-card__poster--big">
          <img src={poster} alt={name} width={218} height={327} />
        </div>
        <div className="movie-card__desc">
          <MoviePageTabs activeTab={activeTab} onClick={onClick}/>
          <div className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              {this._renderReviews(firstPartComments)}
            </div>
            <div className="movie-card__reviews-col">
              {this._renderReviews(secondPartComments)}
            </div>
          </div>
        </div>
      </>
    );
  }

}


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
