import React, { Component, Fragment } from 'react';

class TruthyFalsyQuestionView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className="truthyfalsy-questionview">
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default TruthyFalsyQuestionView;