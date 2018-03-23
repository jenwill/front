import * as actions from '../action/quiz-action';
require('jest');

describe('quiz actions', () => {
  it('should create an action to set a quiz', () => {
    let game = {game: 1234};
    let action = actions.quizCreate(game);

    expect(action.type).toEqual('QUIZ_CREATE');
  });
  it('should create an action to fetch a quiz', () => {
    let game = {game: 1234};
    let action = actions.quizFetch(game);

    expect(action.type).toEqual('QUIZ_FETCH');
  });
  it('should have a signup request function', () => {
    expect(typeof actions.saveQuizToDb).toBe('function');
  });
  it('should send a user', () => {
    let user = {username: 'a', password: '1'};
    expect(actions.saveQuizToDb()).toBeInstanceOf(Function);
  });
  it('should have a signin request function', () => {
    expect(typeof actions.fetchQuizzes).toBe('function');
  });
  it('should get a user', () => {
    let user = {username: 'a', password: '1'};
    expect(actions.fetchQuizzes()).toBeInstanceOf(Function);
  });
});
