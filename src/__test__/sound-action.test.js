import * as actions from '../action/sound-action';
require('jest');

describe('sound actions', () => {
  it('should create an action to toggle sound', () => {
    let sound = {sound: 1234};
    let action = actions.toggleSound(sound);

    expect(action.type).toEqual('TOGGLE_SOUND');
  });
  it('should create an action to set sound', () => {
    let sound = {sound: 1234};
    let action = actions.setSound(sound);

    expect(action.type).toEqual('SET_SOUND');
  });
});
