import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import TFQuestion from '../../model/tfquestion';
import superagent from 'superagent';
import {saveQuizToDb} from '../../action/createquiz-action';

class CreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let newGame = {
      name: document.getElementById('createquiz-name').value,
      questions: [
        new TFQuestion(document.getElementById('createquiz-questionone').value, document.getElementById('createquiz-answerone').value),
        new TFQuestion(document.getElementById('createquiz-questiontwo').value, document.getElementById('createquiz-answertwo').value),
        new TFQuestion(document.getElementById('createquiz-questionthree').value, document.getElementById('createquiz-answerthree').value),
        new TFQuestion(document.getElementById('createquiz-questionfour').value, document.getElementById('createquiz-answerfour').value),
        new TFQuestion(document.getElementById('createquiz-questionfive').value, document.getElementById('createquiz-answerfive').value),
      ],
    };

    console.log('new game:', newGame);
    this.props.createQuiz(newGame, this.props.token);
  }

  render() {
    return (
      <Fragment>
        <h1>CREATE QUIZ</h1>
        <form className="createquiz-form">
          <label className="createquiz-label">Quiz Name:</label>
          <input className="createquiz-input" id="createquiz-name" type="text" placeholder="Quiz Name"/>
          <label className="createquiz-label">Question:</label>
          <input className="createquiz-input" id="createquiz-questionone" type="text" placeholder="Question One"/>
          <label className="createquiz-label">Answer:</label>
          <input className="createquiz-input" id="createquiz-answerone" type="text" placeholder="Answer One"/>
          <label className="createquiz-label">Question:</label>
          <input className="createquiz-input" id="createquiz-questiontwo" type="text" placeholder="Question Two"/>
          <label className="createquiz-label">Answer:</label>
          <input className="createquiz-input" id="createquiz-answertwo" type="text" placeholder="Answer Two"/>
          <label className="createquiz-label">Question:</label>
          <input className="createquiz-input" id="createquiz-questionthree" type="text" placeholder="Question Three"/>
          <label className="createquiz-label">Answer:</label>
          <input className="createquiz-input" id="createquiz-answerthree" type="text" placeholder="Answer Three"/>
          <label className="createquiz-label">Question:</label>
          <input className="createquiz-input" id="createquiz-questionfour" type="text" placeholder="Question Four"/>
          <label className="createquiz-label">Answer:</label>
          <input className="createquiz-input" id="createquiz-answerfour" type="text" placeholder="Answer Four"/>
          <label className="createquiz-label">Question:</label>
          <input className="createquiz-input" id="createquiz-questionfive" type="text" placeholder="Question Five"/>
          <label className="createquiz-label">Answer:</label>
          <input className="createquiz-input" id="createquiz-answerfive" type="text" placeholder="Answer Five"/>
          <button type="button" onClick={this.handleSubmit}>Save Quiz</button>
          <button type="button">Back To Choose Game</button>
        </form>
        {/* <QuizItem/> */}
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  token: state.token,
});

let mapDispatchToProps = dispatch => ({
  createQuiz: (quiz, token) => dispatch(saveQuizToDb(quiz, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
