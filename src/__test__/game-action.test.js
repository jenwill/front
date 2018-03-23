import * as actions from '../action/game-action';
require('jest');

describe('game actions', () => {
  it('should create an action to set a game', () => {
    let game = {game: 1234};
    let action = actions.gameSet(game);

    expect(action.type).toEqual('GAME_SET');
  });
  it('should create an action to delete a game', () => {
    let game = {game: 1234};
    let action = actions.gameDelete(game);

    expect(action.type).toEqual('GAME_DELETE');
  });
});
