import React, {PureComponent} from 'react';

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: `Overview`
      };

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(tab) {
      this.setState({
        activeTab: tab
      });
    }


    render() {


      return (

        <Component
          {...this.props}
          clickHandler={this.handleClick}
          activeTab={this.state.activeTab}
        />

      );
    }
  }


  return WithActiveTab;
};

export default withActiveTab;
