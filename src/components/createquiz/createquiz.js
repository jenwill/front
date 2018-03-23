import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import TFQuestion from '../../model/tfquestion';
import superagent from 'superagent';
import {saveQuizToDb} from '../../action/quiz-action';
import {renderIf} from '../../lib/utils';

// Filter
const Filter = require('bad-words');
const filter = new Filter();
filter.removeWords('hello');
filter.removeWords('class');
filter.removeWords('classes');

class CreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.questionCount = 0;
    this.questions = '';

    this.state = ({
      redirectToChooseGame: false,
      questions: this.questions,
      countError: '',
      numChosen: false,
    });

    this.addNewQuestions = this.addNewQuestions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnStateQuestions = this.returnStateQuestions.bind(this);

  }

  handleSubmit(event) {
    let newGame = {
      name: filter.clean(document.getElementById('createquiz-name').value),
      questions: [],
    };

    for (let i = 1; i <= this.questionCount; i++) {
      let currentQuestion = new TFQuestion(filter.clean(document.getElementById(`createquiz-question${i}`).value), document.querySelector(`input[name="answer${i}"]:checked`).value);
      newGame.questions.push(currentQuestion);
    }

    let form = document.getElementsByClassName('createquiz-form')[0];
    this.props.createQuiz(newGame, this.props.token);
    form.reset();
    this.setState({ redirectToChooseGame: true });
  }

  addNewQuestions() {
    let questionCount = document.getElementById('createquiz-num').value;
    if (questionCount < 1 || questionCount > 20) {
      this.setState({ countError: 'Number of questions must be between 1 and 20.' });
      return;
    }
    this.questionCount = questionCount;

    for (let i = 1; i <= this.questionCount; i++) {
      this.questions += `
        <input type="text" className="createquiz-input" id="createquiz-question${i}" placeholder="Question" required />
        True <input type="radio" name="answer${i}" value="true" className="createquiz-radio" required />
        False <input type="radio" name="answer${i}" value="false" className="createquiz-radio" required />
        <br /><br />
      `;
    }

    this.setState({
      questions: this.questions,
      numChosen: true,
    });
  }

  returnStateQuestions() {
    return { __html: this.state.questions};
  }


  render() {
    return (
      <Fragment>
        <div className="createquiz-wrapper">
          <h1>CREATE QUIZ</h1>
          <h2 className="createquiz-h2">write your own quiz</h2>
          <form className="createquiz-form">
            <label className="createquiz-label">Quiz Name:</label>
            <input type="text" className="createquiz-input" id="createquiz-name" placeholder="Quiz Name" required /><br />

            {renderIf(!this.state.numChosen, <div>
              <label className="createquiz-label"># Questions:</label><br />
              <input type="number" className="createquiz-input" id="createquiz-num" placeholder="#" /> <button className="generatequestions-button" type="button" id="generatequestions" onClick={this.addNewQuestions}>Generate Questions</button>
              <div className="count-error secondary-color">{this.state.countError}</div>
            </div>)}

            <div dangerouslySetInnerHTML={this.returnStateQuestions()} />

            <br />
            {renderIf(this.state.numChosen, 
              <button className="createquiz-button" type="button" onClick={this.handleSubmit}>Save Quiz</button>
            )}
            <br />
            <Link to={'/choosegame'}><button className="createquiz-button" type="button">Go Back</button></Link>

          </form>

          {renderIf(this.state.redirectToChooseGame, <Redirect to="/choosegame" />)}
        </div>
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
