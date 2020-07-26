import React, {PureComponent} from 'react';
import {TabsNames} from "../../constants.js";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TabsNames.OVERVIEW
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
          activeTab={this.state.activeTab}
          onClick={this.handleClick}
        />

      );
    }
  }


  return WithActiveTab;
};

export default withActiveTab;
