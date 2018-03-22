import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../lib/utils';
import TruthyFalsyPlayerView from './truthyfalsy/playerview';
import TruthyFalsyAnswerView from './truthyfalsy/answerview';

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
      correctResults: [],
      incorrectResults: [],
      allResults: [],
      redirectToErrorView: false,
      redirectEndGame: false,
    };

    this.startGame = this.startGame.bind(this);
    this.tallyAnswers = this.tallyAnswers.bind(this);
    this.gameResults = this.gameResults.bind(this);
    this.endGameRedirect = this.endGameRedirect.bind(this);
  }

  componentDidMount() {
    console.log('gameview: component did mount');
    // when the host clicks the start game button, redirects all players from waitingroom to gameview page also
    if (this.isHost) {
      console.log('isHost', this.props.room.nickname);
      // console.log('PLAYER ID ARRAY', this.props.room.playerIDs);
      // this.socket.emit('UPDATE_PLAYERARRAY', this.props.room.playerIDs, this.props.room.code);
      this.socket.emit('REDIRECT_PLAYERS', this.roomCode, '/gameview');
      this.startGame();
    }

    // if the host disconnects, redirects to errorview
    this.socket.on('REDIRECT_DISCONNECT', () => {
      this.setState({ redirectToErrorView: true });
    });    
    
    // when receiving a question from back end
    this.socket.on('SEND_QUESTION', (question) => {
      this.setState({
        questionPhase: true,
        answerPhase: false,
        currentQuestion: question.question,
        currentAnswer: question.answer,
        currentAnswerResults: [],
        correctResults: [],
        incorrectResults: [],
      });
      console.log('___received a question from back end, question phase');
    });

    // if correct answer from player
    this.socket.on('CORRECT_ANSWER', (nickname, score) => {
      console.log('__correct answer');
      let answerResult = {'nickname': nickname, 'score': score, 'correct': true};
      this.state.currentAnswerResults.push(answerResult);
      this.setState({
        currentAnswerResults: this.state.currentAnswerResults,
      });
    });

    // if wrong answer from player
    this.socket.on('WRONG_ANSWER', (nickname, score) => {
      console.log('__wrong answer');
      let answerResult = { 'nickname': nickname, 'score': score, 'correct': false };
      this.state.currentAnswerResults.push(answerResult);
      this.setState({
        currentAnswerResults: this.state.currentAnswerResults,
      });
    });

    // after the question phase and all answers are in
    this.socket.on('INITIATE_ANSWER_PHASE', () => {
      console.log('__INITIATING ANSWER PHASE FROM BACK END', this.state.currentAnswerResults);
      this.setState({
        questionPhase: false,
        answerPhase: true,
      });
    });

    this.socket.on('TALLY_ANSWERS', () => {
      setTimeout(this.tallyAnswers, 1000);
    });


    this.socket.on('TRUTHYFALSY_HOST_PASS_ANSWER', (isCorrect, id, roomCode) => {
      console.log('passing answer to host');
      this.socket.emit('TRUTHYFALSY_HOST_RECEIVE_ANSWER', isCorrect, id, roomCode);
    });

    this.socket.on('END_GAME', () => {
      console.log('__INITIATING END GAME');
      this.setState({
        questionPhase: false,
        answerPhase: false,
        endGame: true,
      });

      setTimeout(this.endGameRedirect, 20000);
    });
    
    this.socket.on('DISPLAY_ENDGAME_RESULTS', () => {
      this.gameResults();
    });

    this.socket.on('REDIRECT_ENDGAME', () => {
      this.setState({ redirectEndGame: true });
    });
  }

  startGame() {
    console.log('gameview: start game');
    let data = { 'game': this.game, 'instance': this.instance, 'roomCode': this.roomCode };
    this.socket.emit('START_GAME', data);
  }

  tallyAnswers() {
    // hella work to display html in react...
    console.log('__tallyanswers');
    this.correctResults = [];
    this.incorrectResults = [];
    this.state.currentAnswerResults.forEach(result => {
      if (result.correct) {
        this.correctResults = this.correctResults.concat([<span className="correct-result"><span className="answer-result-nickname"><strong>{result.nickname}</strong></span>: <span className="answer-result-correct">CORRECT</span></span>, <br />]);
      }
      else {
        this.incorrectResults = this.incorrectResults.concat([<span className="incorrect-result"><span className="answer-result-nickname"><strong>{result.nickname}</strong></span>: <span className="answer-result-incorrect">INCORRECT</span></span>, <br />]);
      }
    });
    this.correctResults.map((el, i) => <span key={i}>{el}</span>);
    this.incorrectResults.map((el, i) => <span key={i}>{el}</span>);

    this.setState({
      correctResults: this.correctResults,
      incorrectResults: this.incorrectResults,
    });
  }

  gameResults() {
    console.log('__endgame');
    this.allResults = [];
    this.state.currentAnswerResults.sort((a, b) => b.score - a.score);
    this.state.currentAnswerResults.forEach(result => {
      this.allResults = this.allResults.concat([<span className="endgame-result"><span className="endgame-result-nickname">{result.nickname}</span>: <span className="endgame-result-score">{result.score}</span></span>, <br />]);
    });
    this.allResults.map((el, i) => <span key={i}>{el}</span>);

    this.setState({
      allResults: this.allResults,
    });
  }

  endGameRedirect() {
    console.log('redirecting after end game');
    this.socket.emit('END_GAME', this.roomCode);
  }

  render() {
    return (
      <Fragment>
        <h1>{this.game}: {this.instance.name}</h1>

        {renderIf(this.state.questionPhase, <div id="game-prompt">{this.state.currentQuestion}</div>)}


        {renderIf(this.state.questionPhase && !this.isHost, <div id="game-mobile-view"><TruthyFalsyPlayerView currentAnswer={this.state.currentAnswer} /></div>)}


        {renderIf(this.state.answerPhase, <div id="host-answer-view">
          <h2>Question: {this.state.currentQuestion}</h2>
          <h2>Answer: {this.state.currentAnswer.toString()}</h2>
          <TruthyFalsyAnswerView>
            {this.state.correctResults}
            {this.state.incorrectResults}
          </TruthyFalsyAnswerView>
        </div>)}

        {renderIf(this.state.answerPhase && !this.isHost, <div id="player-answer-view">Results are up! Look on the host screen.</div>)}


        {renderIf(this.state.endGame, <div id="host-endgame-view">
          <TruthyFalsyAnswerView>
            <h3>End Game</h3>
            <h5>You will be redirected after 20 seconds.</h5>
            {this.state.allResults}
          </TruthyFalsyAnswerView>
        </div>)}


        {renderIf(this.state.endGame && !this.isHost, <div id="player-endgame-view">The game has ended! Check the host screen for results.</div>)}


        {renderIf(this.state.redirectToErrorView, <Redirect to="/error/disconnected" />)}
        {renderIf(this.state.redirectEndGame, <Redirect to="/" />)}

      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
  game: state.game,
});

let mapDispatchToProps = dispatch => ({
  setGame: game => dispatch(gameActions.gameSet(game)),
  deleteGame: () => dispatch(gameActions.gameDelete()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
