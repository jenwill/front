const validateQuiz = quiz => {
  if(!quiz)
    throw new Error('Quiz missing');

  if(!quiz.name || !quiz.questions)
    throw new Error('Invalid quiz');
};

export default (state = [], {type, payload}) => {
  switch(type){
  case 'QUIZ_CREATE':
    validateQuiz(payload);
    return [payload, ...state];

  default:
    return state;
  }
};
