import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

class Statusbar extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.statusUpdate ? {status: this.props.statusUpdate} : {status: null};
  }

  render() {
    return (
      <div id="statusbar" className="statusbar-div">Status: {this.state.status ? this.state.status : ''}</div>
    );
  }
}

export default Statusbar;