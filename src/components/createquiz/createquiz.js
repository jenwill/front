import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

//THIS SUCKS -- needs to be more dynamic and almost completely refactored -- Deam

class CreateQuiz extends Component {

  render() {
    return (
      <Fragment>
        <h1>CREATE QUIZ</h1>
        <form className="createquiz-form">
          <label className="createquiz-label">Quiz Name:</label>
          <input className="createquiz-input" id="createquiz-name" type="text" placeholder="Quiz Name"/>
          <label className="createquiz-label">Question:</label>
          <input className="createquiz-input" id="createquiz-question" type="text" placeholder="Question"/>
          <label className="createquiz-label">Answer:</label>
          <input className="createquiz-input" id="createquiz-answer" type="text" placeholder="Question"/>
        </form>
      </Fragment>
    );
  }
}

export default CreateQuiz;