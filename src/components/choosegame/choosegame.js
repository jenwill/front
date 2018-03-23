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

    console.log('choosegame props', this.props);

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

  componentDid() {
    let userQuizzes = this.props.quizzes.filter(quiz => {
      if (this.props.profile.games.length > 0) {
        console.log('yep');
        if (this.props.profile.games.includes(quiz._id)) {
          return quiz._id;
        }
      }
    });

    console.log(userQuizzes);
  }

  getQuiz() {
    // superagent request to get the quiz selected, pushes it to state, and then direct user to the waiting room page
    // using hard coded values for now
    let game = 'truthyfalsy';
    // let instance = {
    //   name: 'Sample Quiz',
    //   questions: [
    //     { 'question': 'React is a JS framework.', 'answer': false },
    //     { 'question': 'Node is based off the Chrome v8 engine.', 'answer': true },
    //     { 'question': 'JavaScript is single-threaded.', 'answer': true },
    //   ],
    // };

    let selectedQuiz = document.getElementById('quiz-selector');
    selectedQuiz = selectedQuiz.options[selectedQuiz.selectedIndex].value;

    console.log('selectedQuiz', selectedQuiz);

    let instance = this.props.quizzes.filter(quiz => quiz._id === selectedQuiz)[0];
    console.log('game instance', instance);

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
              <div className="game-name">Truthy <span className="button-hover-color">Falsy</span></div>
              <div className="select">
                <select id="quiz-selector">
                  <option disabled selected hidden>click to select quiz...</option>
                  <option>Sample option</option>
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
