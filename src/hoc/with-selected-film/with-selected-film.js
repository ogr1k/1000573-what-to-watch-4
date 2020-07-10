import React, {PureComponent} from 'react';


const withSelectedFilm = (Component) => {
  class WithFilm extends PureComponent {
    constructor(props) {
      super(props);


      this.state = {
        selectedFilm: null
      };

      this.handleHeaderClick = this.handleHeaderClick.bind(this);

    }

    handleHeaderClick(film) {
      this.setState({
        selectedFilm: film
      });
    }

    render() {

      return (
        <Component
          {...this.props}
          handleHeaderClick={this.handleHeaderClick}
          selectedFilm={this.state.selectedFilm}
        >
        </Component>
      );
    }
  }

  WithFilm.propTypes = {};

  return WithFilm;
};

export default withSelectedFilm;
