import { combineReducers } from 'redux';
import room from './room';
import token from './auth';
import quizzes from './quiz';
import socket from './socket';
import game from './game';
import profile from './profile';
import backgroundSound from './sound';

export default combineReducers({
  room, socket, token, quizzes, profile, game, backgroundSound,
});
