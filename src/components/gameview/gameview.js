import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../lib/utils';
import TruthyFalsyMobileView from './truthyfalsy/mobileview';

// we need to check for a roomCode props, or else redirect client to landing
class GameView extends Component {
  constructor(props) {
    super(props);
    console.log('gameview props', this.props);
    this.socket = this.props.socket;
    this.game = this.props.room.game;
    this.roomCode = this.props.room.code;
    this.instance = this.props.room.instance;
    this.isHost = this.props.room.isHost;

    this.state = { 
      questionPhase: null,
      answerPhase: null,
      endGame: false,
      currentQuestion: null,
      questionSent: false,
    };

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    // when the host clicks the start game button, redirects all players from waitingroom to gameview page also
    if (this.isHost) 
      this.socket.emit('REDIRECT_PLAYERS', this.roomCode, '/gameview');
    this.startGame();

    // when receiving a question from back end
    this.socket.on('SEND_QUESTION', (question) => {
      this.setState({
        questionPhase: true,
        answerPhase: false,
        questionSent: true,
        currentQuestion: question,
      });
    });
  }

  startGame() {
    let data = { 'game': this.game, 'instance': this.instance, 'roomCode': this.roomCode };
    this.socket.emit('START_GAME', data);
  }

  render() {
    return (
      <Fragment>
        <h1>{this.game}: {this.instance.name}</h1>

        {renderIf(this.state.questionPhase && this.state.questionSent, <div id="game-prompt">{this.state.currentQuestion.question}</div>)}


        {renderIf(this.state.questionPhase && this.state.questionSent, <div id="game-mobile-view"><TruthyFalsyMobileView /></div>)}


        {renderIf(this.state.answerPhase, <div id="host-answer-view">Host Answer View</div>)}


        {renderIf(this.state.answerPhase, <div id="player-answer-view">Player Answer View</div>)}


        {renderIf(this.state.endGame, <div id="host-endgame-view">Host Endgame View</div>)}


        {renderIf(this.state.endGame, <div id="player-endgame-view">Player Endgame View</div>)}
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
});

let mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
