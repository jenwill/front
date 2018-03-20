import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

// we need to check for a roomCode props, or else redirect client to landing
class GameView extends Component {
  constructor(props) {
    super(props);
    console.log('gameview props', this.props);
    this.socket = this.props.location.socket;
    this.roomCode = this.props.location.roomCode;
    this.game = this.props.location.game;
    this.instance = this.props.location.instance;

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    // game and quiz are passed in from the choosegame component, which makes a superagent request to get the quiz.
    // let game = 'truthyfalsy';
    // let instance = [
    //   { 'question': 'React is a JS framework.', 'answer': false },
    //   { 'question': 'Node is based off the Chrome v8 engine.', 'answer': true },
    //   { 'question': 'JavaScript is single-threaded.', 'answer': true },
    // ];
    let data = { 'game': this.game, 'instance': this.instance, 'roomCode': this.roomCode };
    this.socket.emit('START_GAME', data);
  }

  render() {
    return (
      <Fragment>
        <h1>{this.game}: [this.instance.name]</h1>

        <div id="game-prompt">Question Goes Here</div>


        <div id="game-mobile-view">Mobile View Goes Here</div>


        <div id="host-answer-view">Host Answer View</div>


        <div id="player-answer-view">Player Answer View</div>
      </Fragment>
    );
  }
}

export default GameView;