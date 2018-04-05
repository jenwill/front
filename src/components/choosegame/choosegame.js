import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Redirect, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as roomActions from '../../action/room-action';
import { renderIf } from '../../lib/utils';
import { fetchQuizzes } from '../../action/quiz-action';
import { getProfile } from '../../action/profile-action';

// choose game passes in game, instance (quiz), and isHost: true to WaitingRoom
class ChooseGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'game': null,
      'instance': null,
      'isHost': true,
      'redirect': false,
    };

    this.getQuiz = this.getQuiz.bind(this);

  }

  componentWillMount() {
    this.props.fetchAllQuizzes(this.props.token);
    this.props.fetchProfile(this.props.token);
  }

  getQuiz() {
    let game = 'truthyfalsy';

    let selectedQuiz = document.getElementById('quiz-selector');
    selectedQuiz = selectedQuiz.options[selectedQuiz.selectedIndex].value;

    let instance = this.props.quizzes.filter(quiz => quiz._id === selectedQuiz)[0];

    this.props.setRoom({
      game: game,
      instance: instance,
      isHost: true,
    });

    this.setState({ 'redirect': true });
  }

  render() {

    return (
      <Fragment>
        <div id="choosegame-wrapper">
          <div className="choosegame-header">
            <h1 className="choosegame-h1">Choose Game</h1>
            <h2 className="choosegame-h2">Select your game <span className="secondary-color">& quiz</span></h2>
          </div>
          <div className="center">
            <Link to="/createquiz">
              <button type="button" className="choosegame-button submit">Create Quiz</button>
            </Link>
            <div className="game-choice" id="truthyfalsygame">
              <div className="game-name">
                Truthy Falsy
                <div className="button-hover-color game-description">Answer questions, get points.</div>
              </div>
              <div className="select">
                <select id="quiz-selector">
                  <option disabled selected>click to select quiz...</option>
                  {this.props.quizzes ? this.props.quizzes.map(quiz =>
                    <option key={quiz._id} value={quiz._id}>{quiz.name}</option>) : undefined}
                </select>
              </div>
              <button type="button" onClick={this.getQuiz}>Choose Game</button>
            </div>
          </div>

          {renderIf(this.state.redirect, <Redirect to="/waitingroom" />)}
        </div>
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  token: state.token,
  room: state.room,
  socket: state.socket,
  quizzes: state.quizzes,
  profile: state.profile,
});
let mapDispatchToProps = dispatch => ({
  setRoom: room => dispatch(roomActions.roomSet(room)),
  fetchAllQuizzes: token => dispatch(fetchQuizzes(token)),
  fetchProfile: token => dispatch(getProfile(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGame);
