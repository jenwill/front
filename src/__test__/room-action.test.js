import * as actions from '../action/room-action';
require('jest');

describe('room actions', () => {
  it('should create an action to set a room', () => {
    let room = {room: 1234};
    let action = actions.roomSet(room);

    expect(action.type).toEqual('ROOM_SET');
  });
  it('should create an action to delete a room', () => {
    let room = {room: 1234};
    let action = actions.roomDelete(room);

    expect(action.type).toEqual('ROOM_DELETE');
  });
});
