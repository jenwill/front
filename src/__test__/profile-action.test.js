import * as actions from '../action/profile-action';
require('jest');

describe('profile actions', () => {
  it('should create an action to fetch a profile', () => {
    let profile = {profile: 1234};
    let action = actions.fetchProfile(profile);

    expect(action.type).toEqual('PROFILE_FETCH');
  });
});
