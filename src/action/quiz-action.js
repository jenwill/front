import superagent from 'superagent';
import {logError} from '../lib/utils';

export const quizCreate = quiz => ({
  type: 'QUIZ_CREATE',
  payload: quiz,
});

export const quizFetch = quizzes => ({
  type: 'QUIZ_FETCH',
  payload: quizzes,
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

export const fetchQuizzes = token => dispatch => {
  return superagent.get(`${__API_URL__}/api/v1/truthyfalsy`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => dispatch(quizFetch(res.body)))
    .catch(logError);
};

// export const fetchMyQuizzes = token => dispatch => {
//   return superagent.get(`${__API_URL__}/api/v1/truthyfalsy`)
//     .set('Authorization', `Bearer ${token}`)
//     .then(res => dispatch(quizFetch(res.body)))
//     .catch(logError);
// };
