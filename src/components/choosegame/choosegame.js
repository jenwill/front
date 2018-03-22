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
    let instance = [
      { 'question': 'React is a JS framework.', 'answer': false },
      { 'question': 'Node is based off the Chrome v8 engine.', 'answer': true },
      { 'question': 'JavaScript is single-threaded.', 'answer': true },
    ];

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
        <h1>CHOOSE YO GAME</h1>
        <Link to={'/createquiz'}><button type="button">Create Quiz</button></Link>
        {/* <button type="button" className="choosegame-button" id="create-quiz" onClick={() => }>Create Quiz</button> */}

        {/* <div className="game-choice" id="truthyfalsygame">
          <img src="http://via.placeholder.com/200x200" />
          <h3>Title</h3>
          <select name="choose-quiz">
            <option value="value1">Value 1</option>
          </select>
          <button type="button" onClick={this.getQuiz}>Choose Game</button>
        </div> */}

        <div className="game-choice" id="truthyfalsygame">
          <img src="http://via.placeholder.com/200x200" />
          <h3>Title2</h3>
          <select name="choose-quiz">
            {/* <option value="value1">Value asdf</option> */}
            {this.props.quizzes ? this.props.quizzes.map(quiz =>
              <option key={quiz._id} value={quiz.name}>{quiz.name}</option>) : undefined}
            {/* {console.log('profile props games', this.props.profile)}
            {console.log('quizzes', this.props.quizzes)} */}
            {/* {console.log('user quizzes', userQuizzes)} */}
          </select>
          <button type="button" onClick={this.getQuiz}>Choose Game</button>
        </div>

        {renderIf(this.state.redirect, <Redirect to="/waitingroom" />)}

        {/* {this.props.quizzes ?
          console.log(this.props.quizzes)
          : undefined} */}

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
