import './styles/_main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app.js';
import io from 'socket.io-client';
const socket = io(__API_URL__); // eslint-disable-line

ReactDom.render(<App socket={socket} />, document.getElementById('root'));