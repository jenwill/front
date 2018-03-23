import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import TFQuestion from '../../model/tfquestion';
import superagent from 'superagent';
import {saveQuizToDb} from '../../action/quiz-action';
import {renderIf} from '../../lib/utils';
import TruthyFalsyQuestionView from './truthyfalsyquestionview';

// Filter
const Filter = require('bad-words');
const filter = new Filter();
filter.removeWords('hello');
filter.removeWords('class');
filter.removeWords('classes');

class CreateQuiz extends Component {
  constructor(props) {
    super(props);

    this.questionCount = 1;
    this.questions = '';

    this.state = ({
      redirectToChooseGame: false,
      questions: this.questions,
    });

    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnStateQuestions = this.returnStateQuestions.bind(this);

  }

  handleSubmit(event) {
    // let newGame = {
    //   name: filter.clean(document.getElementById('createquiz-name').value),
    //   questions: [
    //     new TFQuestion(filter.clean(document.getElementById('createquiz-question1').value), document.querySelector('input[name="answer1"]:checked').value),
    //     new TFQuestion(filter.clean(document.getElementById('createquiz-questiontwo').value), document.querySelector('input[name="answer-two"]:checked').value),
    //     new TFQuestion(filter.clean(document.getElementById('createquiz-questionthree').value), document.querySelector('input[name="answer-three"]:checked').value),
    //     new TFQuestion(filter.clean(document.getElementById('createquiz-questionfour').value), document.querySelector('input[name="answer-four"]:checked').value),
    //     new TFQuestion(filter.clean(document.getElementById('createquiz-questionfive').value), document.querySelector('input[name="answer-five"]:checked').value),
    //   ],
    // };

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

  addNewQuestion() {
    this.questionCount++;

    let question = `
      <label className="createquiz-label">Question:</label>
      <input type="text" className="createquiz-input" id="createquiz-question${this.questionCount}" placeholder="Question" />
      <label className="createquiz-label">Answer:</label> <br />
      True <input type="radio" name="answer${this.questionCount}" value="true" className="createquiz-radio" />
      False <input type="radio" name="answer${this.questionCount}" value="false" className="createquiz-radio" />
      <br />
    `;

    this.questions += question;

    this.setState({
      questions: this.questions,
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
            <input type="text" className="createquiz-input" id="createquiz-name" placeholder="Quiz Name" />

            <label className="createquiz-label">Question:</label>
            <input type="text" className="createquiz-input" id="createquiz-question1" placeholder="Question" />
            <label className="createquiz-label">Answer:</label><br />
            True <input type="radio" name="answer1" value="true" className="createquiz-radio" /> 
            False <input type="radio" name="answer1" value="false" className="createquiz-radio" />

            <br />

            <div dangerouslySetInnerHTML={this.returnStateQuestions()} />
            {/* <TruthyFalsyQuestionView>
                {this.state.questions}
              </TruthyFalsyQuestionView>
            </div> */}

            {/* <fieldset> */}
            {/* <label className="createquiz-label">Question:</label>
              <input className="createquiz-input" id="createquiz-questionone" type="text" placeholder="Question One"/>

              <label className="createquiz-label">Answer:</label><br />
              <label className="createquiz-label">True</label>
              <input type="radio" name="answer-one" value="true" className="createquiz-input" id="createquiz-answerone-true" placeholder="Answer One"/>
              <label className="createquiz-label">False</label>
              <input type="radio" name="answer-one" value="false" className="createquiz-input" id="createquiz-answerone-false" placeholder="Answer One"/>
            </fieldset>
            <fieldset>
              <label className="createquiz-label">Question:</label>
              <input className="createquiz-input" id="createquiz-questiontwo" type="text" placeholder="Question Two"/>

              <label className="createquiz-label">Answer:</label><br />
              <label className="createquiz-label">True</label>
              <input type="radio" name="answer-two" value="true" className="createquiz-input" id="createquiz-answertwo-true" placeholder="Answer Two"/>
              <label className="createquiz-label">False</label>
              <input type="radio" name="answer-two" value="false" className="createquiz-input" id="createquiz-answertwo-false" placeholder="Answer Two"/>
            </fieldset>
            <fieldset>
              <label className="createquiz-label">Question:</label>
              <input className="createquiz-input" id="createquiz-questionthree" type="text" placeholder="Question Three"/>

              <label className="createquiz-label">Answer:</label><br />
              <label className="createquiz-label">True</label>
              <input type="radio" name="answer-three" value="true" className="createquiz-input" id="createquiz-answerthree-true" placeholder="Answer Three"/>
              <label className="createquiz-label">False</label>
              <input type="radio" name="answer-three" value="false" className="createquiz-input" id="createquiz-answerthree-false" placeholder="Answer Three"/>
            </fieldset>
            <fieldset>
              <label className="createquiz-label">Question:</label>
              <input className="createquiz-input" id="createquiz-questionfour" type="text" placeholder="Question Four"/>

              <label className="createquiz-label">Answer:</label><br />
              <label className="createquiz-label">True</label>
              <input type="radio" name="answer-four" value="true" className="createquiz-input" id="createquiz-answerfour-true" placeholder="Answer Four"/>
              <label className="createquiz-label">False</label>
              <input type="radio" name="answer-four" value="false" className="createquiz-input" id="createquiz-answerfour-false" placeholder="Answer Four"/>
            </fieldset>
            <fieldset>
              <label className="createquiz-label">Question:</label>
              <input className="createquiz-input" id="createquiz-questionfive" type="text" placeholder="Question Five"/>

              <label className="createquiz-label">Answer:</label><br />
              <label className="createquiz-label">True</label>
              <input type="radio" name="answer-five" value="true" className="createquiz-input" id="createquiz-answerfive-true" placeholder="Answer Five"/>
              <label className="createquiz-label">False</label>
              <input type="radio" name="answer-five" value="false" className="createquiz-input" id="createquiz-answerfive-false" placeholder="Answer Five"/> */}
            {/* </fieldset> */}

            <button className="createquiz-button" type="button" onClick={this.addNewQuestion}>Add Question</button>

            <br />

            <Link to={'/choosegame'}><button className="createquiz-button" type="button">Back</button></Link>

            <button className="createquiz-button" type="button" onClick={this.handleSubmit}>Save Quiz</button>
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
