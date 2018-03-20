import { combineReducers } from 'redux';
import room from './room';
import token from './auth';
import socket from './socket';

export default combineReducers({
  room, socket, token,
});