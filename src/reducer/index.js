import { combineReducers } from 'redux';
import room from './room';
import token from './auth';
import quizzes from './quiz';
import socket from './socket';
import profile from './profile';

export default combineReducers({
  room, socket, token, quizzes, profile,
});
