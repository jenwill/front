import React, { Component, Fragment } from 'react';
import { renderIf } from '../../../lib/utils';

class TruthyFalsyAnswerView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="truthyfalsy-answerview">
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default TruthyFalsyAnswerView;