import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../lib/utils';
import TruthyFalsyMobileView from './truthyfalsy/mobileview';
import * as gameActions from '../../action/game-action';

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
    this.res = '';

    this.state = { 
      questionPhase: null,
      answerPhase: null,
      endGame: false,
      currentQuestion: '',
      currentAnswer: '',
      currentAnswerResults: [],
      displayResults: '',
    };

    this.startGame = this.startGame.bind(this);
    this.tallyAnswers = this.tallyAnswers.bind(this);
  }

  componentDidMount() {
    console.log('gameview: component did mount');
    // when the host clicks the start game button, redirects all players from waitingroom to gameview page also
    if (this.isHost) {
      // console.log('PLAYER ID ARRAY', this.props.room.playerIDs);
      // this.socket.emit('UPDATE_PLAYERARRAY', this.props.room.playerIDs, this.props.room.code);
      this.socket.emit('REDIRECT_PLAYERS', this.roomCode, '/gameview');
      this.startGame();
    }
    
    // when receiving a question from back end
    this.socket.on('SEND_QUESTION', (question) => {
      console.log('__question phase');
      this.setState({
        questionPhase: true,
        answerPhase: false,
        currentQuestion: question.question,
        currentAnswer: question.answer,
        currentAnswerResults: [],
        displayResults: '',
      });
      this.props.setGame(this.state.currentAnswerResults);
      this.res = '';
    });

    // if correct answer from <MobileView />
    this.socket.on('CORRECT_ANSWER', (nickname, score) => {
      console.log('__correct answer');
      let answerResults = this.state.currentAnswerResults;
      answerResults.push({'nickname': nickname, 'score': score, 'correct': true});
      this.setState({
        currentAnswerResults: answerResults,
      });
      this.props.setGame(this.state.currentAnswerResults);
    });

    // if wrong answer from <MobileView />
    this.socket.on('WRONG_ANSWER', (nickname, score) => {
      console.log('__wrong answer');
      let answerResults = this.state.currentAnswerResults;
      answerResults.push({ 'nickname': nickname, 'score': score, 'correct': false });
      this.setState({
        currentAnswerResults: answerResults,
      });
      this.props.setGame(this.state.currentAnswerResults);
    });

    // after the question phase and all answers are in
    this.socket.on('INITIATE_ANSWER_PHASE', () => {
      console.log('__answer phase');
      this.setState({
        questionPhase: false,
        answerPhase: true,
      });

      // allows time for componentWillUnmount in the mobile view component to fire for unresponsive players, so that we will receive scores for every player
      setTimeout(this.tallyAnswers, 1000);
    });
  }

  startGame() {
    console.log('gameview: start game');
    let data = { 'game': this.game, 'instance': this.instance, 'roomCode': this.roomCode };
    this.socket.emit('START_GAME', data);
  }

  tallyAnswers() {
    console.log('__tallyanswers');
    this.res = '';
    this.state.currentAnswerResults.forEach(result => {
      let color = result.correct ? 'green' : 'red';
      this.res += `<span className="${color}"><span className="answer-result-nickname">${result.nickname}</span>: <span className="answer-result-score">${result.score}</span></span><br />`;
    });
    this.setState({
      displayResults: this.res,
    });
  }

  render() {
    return (
      <Fragment>
        <h1>{this.game}: {this.instance.name}</h1>

        {renderIf(this.state.questionPhase, <div id="game-prompt">{this.state.currentQuestion}</div>)}


        {renderIf(this.state.questionPhase, <div id="game-mobile-view"><TruthyFalsyMobileView /></div>)}


        {renderIf(this.state.answerPhase, <div id="host-answer-view">
          <h2>Question: {this.state.currentQuestion}</h2>
          <h2>Answer: {this.state.currentAnswer}</h2>
          (this.state.displayResults)
        </div>)}


        {renderIf(this.state.answerPhase, <div id="player-answer-view">Results are up! Look on the host screen.</div>)}


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

let mapDispatchToProps = dispatch => ({
  setGame: game => dispatch(gameActions.gameSet(game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
