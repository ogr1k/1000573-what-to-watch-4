import * as React from 'react';
import {Subtract} from "utility-types";
import { Review } from '../../types';

const MAX_COMMENT_SYMBOLS = 400;
const MIN_COMMENT_SYMBOLS = 50;


interface Props {
  postReview: (argument: Review) => void;
}

interface State {
  comment?: string;
  rating?: string;
}

interface InjectedProps {
  onChange: (e: React.FormEvent) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClick: (e: React.MouseEvent) => void;
  isValid: boolean;
}

const withFormValues = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithFormValues extends React.PureComponent<T, State> {
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

      const isValid = Boolean(this.state.comment.length >= MIN_COMMENT_SYMBOLS && this.state.comment.length <= MAX_COMMENT_SYMBOLS && this.state.rating);

      return (

        <Component
          {...this.props}
          onSubmit={this.handleSubmit}
          onClick={this.handleClick}
          onChange={this.handleChange}
          isValid={isValid}
        />

      );
    }
  }

  return WithFormValues;
};


export default withFormValues;
export {InjectedProps};
