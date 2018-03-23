import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import logoPath from '../../public/images/socket.svg';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="navbar">
          <img src={logoPath} />
          <ul>
            <li className="home-li"><Link to="/">Sockit</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default Navbar;