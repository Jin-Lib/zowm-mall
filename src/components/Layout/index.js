import React, { Component, Fragment } from 'react';
import VConsole from 'vconsole';

class Layout extends Component {
  componentDidMount() {
   // new VConsole();
  }

  render() {

    return(
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default Layout;