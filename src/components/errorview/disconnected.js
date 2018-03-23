import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Disconnected extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="center errorview">
          <h1>Error!</h1>

          <br /><br />

          <span className="secondary-color">You have been disconnected from the game.</span> 
          <br /><br />
        
          <Link to="/">Return to homepage.</Link>
        </div>
      </Fragment>
    );
  }
}

export default Disconnected;