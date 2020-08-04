import React from "react";
import AddReview from "../add-review/add-review.jsx";
import withFormValues from "../../hoc/with-form-values/with-form-values.js";
import {connect} from "react-redux";
import {Operation, ActionCreator} from "../../reducer/review/review.js";
import {getFetchStatus, getErrorMessage} from "../../reducer/review/selector.js";
import {getFilmById} from "../../reducer/data/selector.js";

const WrappedAddReview = withFormValues(AddReview);

const AddReviewPage = (props) => {


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
  postReview(review) {
    dispatch(Operation.postReview(review, ownProps.match.params.id));
  },
  cleanReviewState() {
    dispatch(ActionCreator.cleanData());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);
