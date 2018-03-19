// const io = require('socket.io').listen(server);
const socket = io('http://localhost:3000');

let sendQuestionForm = document.getElementById('send-question-form');
let questionInput = document.getElementById('question-input');

sendQuestionForm.addEventListener('submit', event => {
  event.preventDefault();
  let question = questionInput.value;
  socket.emit('SEND_QUESTION', {question});
});

socket.on('RECEIVE_QUESTION', data => {
  console.log('RECEIVE_QUESTION',data);
});
