import { combineReducers } from 'redux';
import room from './room';
import token from './auth';
import socket from './socket';
import game from './game';

export default combineReducers({
  room, socket, token, game,
});