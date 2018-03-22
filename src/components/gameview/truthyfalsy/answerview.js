import React, { Component, Fragment } from 'react';
import { renderIf } from '../../../lib/utils';

// we need to check for a roomCode props, or else redirect client to landing
class TruthyFalsyAnswerView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

export default TruthyFalsyAnswerView;