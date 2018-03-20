import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

//NOT DONE-- PLACEHOLDERS BASICALLY NEED TO FINISH -- Dean

class ChooseGame extends Component {

  getQuiz() {
    // superagent request to get the quiz selected and then direct user to the waiting room page
  }

  render() {
    return (
      <Fragment>
        <h1>CHOOSE YO GAME</h1>
        <button type="button" className="choosegame-button" id="create-quiz">Create Quiz</button>

        <li className="game-choice" id="truthyfalsy">
          <img src=''></img>
          <div className="choosegame-overlay">
            <h3>Title</h3>
            <select name="choose-quiz">
              <option value="value1">Value 1</option>
            </select>
          </div>
          <button type="button" onClick={this.getQuiz}>Choose Game</button>
        </li>
      </Fragment>
    );
  }
}

export default ChooseGame;