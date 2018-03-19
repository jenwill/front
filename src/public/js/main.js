// const io = require('socket.io').listen(server);
const socket = io('http://localhost:3000');

let sendQuestionForm = document.getElementById('send-question-form');
let questionInput = document.getElementById('question-input');
let sendAnswer = document.getElementsByClassName('answer-button');

sendQuestionForm.addEventListener('submit', event => {
  event.preventDefault();
  let question = questionInput.value;
  socket.emit('SEND_QUESTION', {question});
});

socket.on('RECEIVE_QUESTION', data => {
  console.log('RECEIVE_QUESTION',data);
});

sendAnswer[0].addEventListener('click', event => {
  event.preventDefault();
  let answer = event.target.id;
  socket.emit('SEND_ANSWER', {answer});
});

sendAnswer[1].addEventListener('click', event => {
  event.preventDefault();
  let answer = event.target.id;
  socket.emit('SEND_ANSWER', {answer});
});

socket.on('RECEIVE_ANSWER', data => {
  console.log('RECEIVE_ANSWER',data);
});

