import * as React from "react";
import AddReview from "../add-review/add-review";
import withFormValues from "../../hoc/with-form-values/with-form-values";
import {connect} from "react-redux";
import {Operation, ActionCreator} from "../../reducer/review/review.js";
import {getFetchStatus, getErrorMessage} from "../../reducer/review/selector.js";
import {getFilmById} from "../../reducer/data/selector.js";
import {Film, Review} from "../../types.js";

const WrappedAddReview = withFormValues(AddReview);

interface Props {
   film: Film;
   postReview: (argument: Review) => void;
   cleanReviewState: () => void;
}


const AddReviewPage: React.FunctionComponent<Props> = (props: Props) => {

  return (
    <section className="movie-card movie-card--full">
      <WrappedAddReview {...props}/>
    </section>
  );

};


const mapStateToProps = (state, ownProps) => ({
  fetchStatus: getFetchStatus(state),
  film: getFilmById(state, ownProps.match.params.id),
  errorMessage: getErrorMessage(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  postReview(review: Review) {
    dispatch(Operation.postReview(review, ownProps.match.params.id));
  },
  cleanReviewState() {
    dispatch(ActionCreator.cleanData());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);
