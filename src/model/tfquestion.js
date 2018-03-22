'use strict';

module.exports = class {
  constructor (question, answer) {
    const validates = (!question || !answer) ? false
      : (typeof question !== 'string') ? false
        : (typeof answer !== 'string') ? false
          : true;
    if(!validates) {
      return new Error('Validation Error, failed to create question');
    }
    this.question = question;
    this.answer = answer;
  }
};

