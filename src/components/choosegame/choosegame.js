import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

//NOT DONE-- PLACEHOLDERS BASICALLY NEED TO FINISH -- Dean

class ChooseGame extends Component {

  render() {
    return (
      <Fragment>
        <h1>CHOOSE YO GAME</h1>
        <button type="button" className="choosegame-button" id="create-quiz">Create Quiz</button>
        <li className="game-choice">
          <img src='http://placehold.it/200x200'></img>
          <div className="choosegame-overlay">
            <h3>Title</h3>
            <select name="choose-quiz">
              <option value="value1">Value 1</option>
            </select>
          </div>
          <button type="button">Choose Game</button>
        </li>
      </Fragment>
    );
  }
}

export default ChooseGame;
