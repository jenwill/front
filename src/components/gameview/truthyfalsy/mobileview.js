import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../../lib/utils';

// we need to check for a roomCode props, or else redirect client to landing
class TruthyFalsyMobileView extends Component {
  constructor(props) {
    super(props);
    console.log('truthyfalsy mobileview props', this.props);
    this.socket = this.props.socket;

    this.state = {
      questionAnswered: false,
    };

    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
  }
  
  handleSubmitAnswer(e) {
    this.setState({
      questionAnswered: true,
    });

    console.log('handleSubmitAnswer', e.target.value);
  }

  render() {
    return (
      <Fragment>
        <h1>{this.game}: {this.instance.name}</h1>

        {renderIf(!this.state.questionAnswered, 
          <div id="mobile-question-view">
            <button type="button" id="true" value="true" onClick={this.handleSubmitAnswer}>true</button>
            <button type="button" id="false" value="false" onClick={this.handleSubmitAnswer}>false</button>
          </div>)}

        {renderIf(this.state.questionAnswered,
          <div id="mobile-answer-submitted-view">
            You have submitted your answer. Hang on tight and wait for the results!
          </div>)}

      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
//   room: state.room,
  socket: state.socket,
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TruthyFalsyMobileView);
