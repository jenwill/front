import * as actions from '../action/auth-action';
require('jest');

describe('auth actions', () => {
  it('should create an action to set a token', () => {
    let auth = {token: 1234};
    let action = actions.tokenSet(auth);

    expect(action.type).toEqual('TOKEN_SET');
  });
  it('should create an action to delete a token', () => {
    let auth = {token: 1234};
    let action = actions.tokenDelete(auth);

    expect(action.type).toEqual('TOKEN_DELETE');
  });
  it('should have a signup request function', () => {
    expect(typeof actions.signupRequest).toBe('function');
  });
  it('should send a user', () => {
    let user = {username: 'a', password: '1'};
    expect(actions.signupRequest()).toBeInstanceOf(Function);
  });
  it('should have a signin request function', () => {
    expect(typeof actions.signinRequest).toBe('function');
  });
  it('should get a user', () => {
    let user = {username: 'a', password: '1'};
    expect(actions.signinRequest()).toBeInstanceOf(Function);
  });
});
