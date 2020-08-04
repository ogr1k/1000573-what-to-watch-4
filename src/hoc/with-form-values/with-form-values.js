import React, {PureComponent} from 'react';
import {Redirect} from "react-router-dom";
import {AppRoute} from '../../constants.js';
import PropTypes from "prop-types";
import {FetchStatus} from '../../reducer/review/review.js';

const MAX_COMMENT_SYMBOLS = 400;
const MIN_COMMENT_SYMBOLS = 50;

const withFormValues = (Component) => {
  class WithFormValues extends PureComponent {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        comment: ``,
        rating: ``
      };
    }

    componentWillUnmount() {

      this.props.cleanReviewState();

    }

    handleChange(e) {

      this.setState({
        comment: e.target.value
      });

    }

    handleClick(e) {

      this.setState({
        rating: e.target.value
      });

    }

    handleSubmit(e) {
      e.preventDefault();

      const {postReview} = this.props;


      postReview({
        rating: this.state.rating,
        comment: this.state.comment
      });
    }


    render() {

      if (this.props.fetchStatus === FetchStatus.DONE) {
        return <Redirect to={`${AppRoute.FILM}/${this.props.film.id}`} />;
      }

      const isValid = Boolean(this.state.comment.length >= MIN_COMMENT_SYMBOLS && this.state.comment.length <= MAX_COMMENT_SYMBOLS && this.state.rating);
      const isFetching = this.props.fetchStatus === FetchStatus.IS_FETCHING;

      return (

        <Component
          {...this.props}
          onSubmit={this.handleSubmit}
          onClick={this.handleClick}
          onChange={this.handleChange}
          film={this.props.film}
          error={this.props.error}
          isValid={isValid}
          isFetching={isFetching}
        />

      );
    }
  }

  WithFormValues.propTypes = {
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
    fetchStatus: PropTypes.string,
    postReview: PropTypes.func.isRequired,
    error: PropTypes.object,
    cleanReviewState: PropTypes.func.isRequired,
    loadFilmsIsFetching: PropTypes.bool
  };

  return WithFormValues;
};


export default withFormValues;
