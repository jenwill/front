import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Disconnected extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <h1>Error!</h1>

        You have been disconnected from the game. <br /><br />
        
        <Link to="/">Return to homepage.</Link>
      </Fragment>
    );
  }
}

export default Disconnected;