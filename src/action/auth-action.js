import superagent from 'superagent';

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenDelete = () => {
//   delete localStorage.token;
  return {
    type: 'TOKEN_DELETE',
  };
};

export const signupRequest = user => dispatch => {
  return superagent.post(`${__API_URL__}/api/v1/register`)
    .send(user)
    .then(res => {
      dispatch(tokenSet(res.text));
      try {
        // localStorage.setItem('token', res.text);
        localStorage.signInError = false;
        localStorage.signUpError = false;
      } catch (e) {
        console.log(e);
        throw e;
      }
    })
    .catch(err => {
      localStorage.signUpError = true;
      localStorage.signInError = false;
      console.log('Invalid registration');
      return 'invalid';
    });
};

export const signinRequest = user => dispatch => {
  return superagent.get(`${__API_URL__}/api/v1/login`)
    .auth(user.username, user.password)
    .then(res => {
      console.log('res', res);
      dispatch(tokenSet(res.text));
      try {
        // localStorage.setItem('token', res.text);
        localStorage.signInError = false;
        localStorage.signUpError = false;
      } catch (e) {
        console.log(e);
        throw e;
      }
    })
    .catch(err => {
      localStorage.signInError = true;
      localStorage.signUpError = false;
      console.log('Invalid login');
      return 'invalid';
    });
};