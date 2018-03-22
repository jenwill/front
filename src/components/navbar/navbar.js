import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="navbar">
          <img src="http://sockit.live/images/socket.svg" />
          <ul>
            <li>Sockit</li>
            <li>About</li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default Navbar;