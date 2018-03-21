'use strict';

const TFQuestion = (question, answer) => {
  const validates = (!question || !answer) ? false
    : (typeof question !== 'string' || !(question instanceof String)) ? false
      : (typeof answer !== 'string' || !(answer instanceof String)) ? false
        : true;
  if(!validates) {
    return new Error('Validation Error, failed to create question');
  }
  this.question = question;
  this.answer = answer;
};
