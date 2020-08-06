import * as React from 'react';
import {TabsNames} from "../../constants.js";
import {Subtract} from "utility-types";

interface State {
  activeTab: string;
}

export interface InjectingProps {
  onClick: (tab: string) => void;
}

const withActiveTab = (Component) => {


  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: TabsNames.OVERVIEW
      };

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(tab: string) {
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
