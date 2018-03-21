import superagent from 'superagent';
import {logError} from '../lib/utils';

export const quizCreate = quiz => ({
  type: 'QUIZ_CREATE',
  payload: quiz,
});

export const saveQuizToDb = (quiz, token) => dispatch => {
  return superagent.post(`${__API_URL__}/api/v1/truthyfalsy`)
    .set('Authorization', `Bearer ${token}`)
    .send(quiz)
    .then(res => {
      return dispatch(quizCreate(res.body));
    })
    .catch(logError);
};
