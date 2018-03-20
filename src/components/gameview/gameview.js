import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// we need to check for a roomCode props, or else redirect client to landing
class GameView extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.roomCode = this.props.location.roomCode;
    this.socket = this.props.location.socket;

    this.startGame = this.startGame.bind(this);
  }

  componentWillMount() {
    this.startGame();
  }

  startGame() {
    // game and quiz are passed in from the choosegame component, which makes a superagent request to get the quiz. It will probably be like let game = this.props.game or something like that, etc.
    let game = 'truthyfalsy';
    let quiz = [
      { 'question': 'React is a JS framework.', 'answer': false },
      { 'question': 'Node is based off the Chrome v8 engine.', 'answer': true },
      { 'question': 'JavaScript is single-threaded.', 'answer': true },
    ];
    let data = { 'game': game, 'instance': quiz, 'roomCode': this.roomCode };
    this.socket.emit('START_GAME', data);
  }

  render() {
    return (
      <Fragment>
        <h1>GameView {this.props.roomCode}</h1>
      </Fragment>
    );
  }
}

export default GameView;