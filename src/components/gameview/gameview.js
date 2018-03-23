import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderIf } from '../../lib/utils';
import TruthyFalsyPlayerView from './truthyfalsy/playerview';
import TruthyFalsyAnswerView from './truthyfalsy/answerview';
import * as gameActions from '../../action/game-action';
import {Howl, Howler} from 'howler';
import sounds from '../../lib/sounds';
import * as soundActions from '../../action/sound-action';

const endGameMusic = new Howl({
  src: [sounds.endgamemusic],
  loop: true,
});

const answerCorrect = new Howl({
  src: [sounds.answercorrect],
  loop: false,
});

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
    this.backgroundSound = this.props.backgroundSound;

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
    this.handleMute = this.handleMute.bind(this);
  }

  componentDidMount() {
    console.log('gameview: component did mount');
    // when the host clicks the start game button, redirects all players from waitingroom to gameview page also
    if (this.isHost) {
      console.log('isHost', this.props.room.nickname);
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
      answerCorrect.play();
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

  handleMute() {
    if (this.props.backgroundSound.backgroundSound) {
      answerCorrect.mute(true);
      endGameMusic.mute(true);
      this.props.toggleSound(this.props.backgroundSound);
    } else {
      answerCorrect.mute(false);
      endGameMusic.mute(false);
      this.props.toggleSound(this.props.backgroundSound);
    }
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
        this.correctResults = this.correctResults.concat([<span className="correct-result"><span className="bold"><strong>{result.nickname}</strong></span>: <span className="valid-color">CORRECT</span></span>, ' | ']);
      }
      else {
        this.incorrectResults = this.incorrectResults.concat([<span className="incorrect-result"><span className="bold"><strong>{result.nickname}</strong></span>: <span className="invalid-color">INCORRECT</span></span>, ' | ']);
      }
    });
    if (!this.incorrectResults.length) this.correctResults.pop();
    this.incorrectResults.pop();
    this.correctResults.map((el, i) => <span key={i}>{el}</span>);
    this.incorrectResults.map((el, i) => <span key={i}>{el}</span>);

    this.setState({
      correctResults: this.correctResults,
      incorrectResults: this.incorrectResults,
    });
  }

  gameResults() {
    if(this.isHost) endGameMusic.play();
    console.log('__endgame');
    this.allResults = [];
    this.state.currentAnswerResults.sort((a, b) => b.score - a.score);
    this.state.currentAnswerResults.forEach(result => {
      this.allResults = this.allResults.concat([<span className="endgame-result"><span className="bold">{result.nickname}</span>: <span className="valid-color">{result.score}</span></span>, ' | ']);
    });
    this.allResults.pop();
    this.allResults.map((el, i) => <span key={i}>{el}</span>);

    this.setState({
      allResults: this.allResults,
    });
  }

  endGameRedirect() {
    if(this.isHost) endGameMusic.stop();
    console.log('redirecting after end game');
    this.socket.emit('END_GAME', this.roomCode);
  }

  render() {
    return (
      <Fragment>
        <div id="gameview-wrapper">
          <div className="gameview-header">
            <h1>{this.game}</h1>
            <h2 className="secondary-color">{this.instance.name}</h2>
          </div>

          {renderIf(this.state.questionPhase && this.isHost, <div id="game-prompt">
            {this.state.currentQuestion}
            <div className="tf-question-progress-bar"><div className="tf-progress"></div></div>
          </div>)}


          {renderIf(this.state.questionPhase && !this.isHost, <div id="game-mobile-view">
            <div id="game-prompt-playerview">{this.state.currentQuestion}</div>
            <TruthyFalsyPlayerView currentAnswer={this.state.currentAnswer} />
          </div>)}

          {renderIf(this.state.answerPhase && this.isHost, <div id="host-answer-view">
            <table className="gameview-table">
              <tbody>
                <tr>
                  <td className="bold left gameview-table-question">Question</td>
                  <td className="secondary-color right gameview-table-answer"><span>{this.state.currentQuestion}</span></td>
                </tr>
                <tr>
                  <td className="bold left gameview-table-question">Answer</td>
                  <td className="secondary-color right gameview-table-answer"><span>{this.state.currentAnswer.toString()}</span></td>
                </tr>
              </tbody>
            </table>
            <TruthyFalsyAnswerView>
              {this.state.correctResults}
              {this.state.incorrectResults}
            </TruthyFalsyAnswerView>
          </div>)}

          {renderIf(this.state.answerPhase && !this.isHost, <div id="player-answerview">Results are up! Look on the host screen.</div>)}


          {renderIf(this.state.endGame, <div id="host-endgame-view">
            <TruthyFalsyAnswerView>
              <h3 className="gameview-endgame invalid-color">End Game</h3>
              <h5 className="secondary-color">You will be redirected after 20 seconds.</h5>
              <div className="truthyfalsy-answerview">
                {this.state.allResults}
              </div>
            </TruthyFalsyAnswerView>
          </div>)}


          {renderIf(this.state.endGame && !this.isHost, <div id="player-endgame-view">The game has ended! Check the host screen for results.</div>)}

          {renderIf(this.state.redirectToErrorView, <Redirect to="/error/disconnected" />)}
          {renderIf(this.state.redirectEndGame, <Redirect to="/" />)}
          {renderIf(this.isHost, <a className="mute-button" onClick={this.handleMute}>Mute Sounds</a>)}

        </div>
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
  game: state.game,
  backgroundSound: state.backgroundSound,
});

let mapDispatchToProps = dispatch => ({
  setGame: game => dispatch(gameActions.gameSet(game)),
  deleteGame: () => dispatch(gameActions.gameDelete()),
  toggleSound: backgroundSound => dispatch(soundActions.toggleSound(backgroundSound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
