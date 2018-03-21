import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as roomActions from '../../action/room-action';
import { renderIf } from '../../lib/utils';

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

  getQuiz() {
    // superagent request to get the quiz selected, pushes it to state, and then direct user to the waiting room page
    // using hard coded values for now
    let game = 'truthyfalsy';
    let instance = {
      name: 'Sample Quiz',
      questions: [
        { 'question': 'React is a JS framework.', 'answer': false },
        { 'question': 'Node is based off the Chrome v8 engine.', 'answer': true },
        { 'question': 'JavaScript is single-threaded.', 'answer': true },
      ],
    };

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
        <button type="button" className="choosegame-button" id="create-quiz">Create Quiz</button>

        <div className="game-choice" id="truthyfalsygame">
          <img src="http://via.placeholder.com/200x200" />
          <h3>Title</h3>
          <select name="choose-quiz">
            <option value="value1">Value 1</option>
          </select>
          <button type="button" onClick={this.getQuiz}>Choose Game</button>
        </div>

        <div className="game-choice" id="truthyfalsygame">
          <img src="http://via.placeholder.com/200x200" />
          <h3>Title2</h3>
          <select name="choose-quiz">
            <option value="value1">Value asdf</option>
          </select>
          <button type="button" onClick={this.getQuiz}>Choose Game</button>
        </div>

        {renderIf(this.state.redirect, <Redirect to="/waitingroom" />)}
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
});
let mapDispatchToProps = dispatch => ({
  setRoom: room => dispatch(roomActions.roomSet(room)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseGame);