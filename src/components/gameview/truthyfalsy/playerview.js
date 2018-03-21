import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../../lib/utils';

// we need to check for a roomCode props, or else redirect client to landing
class TruthyFalsyPlayerView extends Component {
  constructor(props) {
    super(props);
    console.log('truthyfalsy mobileview props', this.props);
    this.socket = this.props.socket;
    this.instance = this.props.room.instance;
    this.answer = '';
    this.roomCode = this.props.room.code;

    this.state = {
      questionAnswered: false,
    };

    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
  }

  componentWillUnMount() {
    if (!this.state.questionAnswered)
      this.socket.emit('TRUTHYFALSY_SEND_ANSWER', false, this.socket.id, this.roomCode);
  }
  
  handleSubmitAnswer(e) {
    this.setState({
      questionAnswered: true,
    });

    console.log('handleSubmitAnswer', e.target.value);
    this.answer = e.target.value;
    if (this.answer === this.props.currentAnswer.toString()) {
      console.log('right answer');
      this.socket.emit('TRUTHYFALSY_SEND_ANSWER', true, this.socket.id, this.roomCode);
    }
    else {
      console.log('wrong answer');
      this.socket.emit('TRUTHYFALSY_SEND_ANSWER', false, this.socket.id, this.roomCode);
    }

  }

  render() {
    return (
      <Fragment>
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
  room: state.room,
  socket: state.socket,
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TruthyFalsyPlayerView);
