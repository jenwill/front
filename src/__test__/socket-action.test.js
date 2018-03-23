import * as actions from '../action/socket-action';
require('jest');

describe('socket actions', () => {
  it('should create an action to set a socket', () => {
    let socket = {socket: 1234};
    let action = actions.socketSet(socket);

    expect(action.type).toEqual('SOCKET_SET');
  });
  it('should create an action to delete a socket', () => {
    let socket = {socket: 1234};
    let action = actions.socketDelete(socket);

    expect(action.type).toEqual('SOCKET_DELETE');
  });
});
