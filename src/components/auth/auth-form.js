import React from 'react';
import { renderIf } from '../../lib/utils';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      signInError: JSON.parse(localStorage.signInError),
      signUpError: JSON.parse(localStorage.signUpError),
    };

    console.log('auth form props', this.props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value.trim(),
    });
  }

  handleLogIn(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.login({ username, password })
      .then((res) => {
        if (res === 'invalid') {
          this.setState({
            signInError: JSON.parse(localStorage.signInError),
            signUpError: JSON.parse(localStorage.signUpError),
          });
          return; 
        }
        this.props.redirect('/choosegame');
      })
      .catch(err => {
        this.setState({
          signInError: JSON.parse(localStorage.signInError),
          signUpError: JSON.parse(localStorage.signUpError),
        });
        console.log(err);
      });

    this.setState({
      signInError: JSON.parse(localStorage.signInError),
      signUpError: JSON.parse(localStorage.signUpError),
    });
  }

  handleRegister(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.register({ username, password })
      .then((res) => {
        if (res === 'invalid') {
          this.setState({
            signInError: JSON.parse(localStorage.signInError),
            signUpError: JSON.parse(localStorage.signUpError),
          });
          return;
        }
        this.props.redirect('/choosegame');
      })
      .catch(err => {
        this.setState({
          signInError: JSON.parse(localStorage.signInError),
          signUpError: JSON.parse(localStorage.signUpError),
        });
        console.log(err);
      });

    this.setState({
      signInError: JSON.parse(localStorage.signInError),
      signUpError: JSON.parse(localStorage.signUpError),
    });
  }

  render() {
    return (
      <React.Fragment>
        <h2>Log In</h2>
        <form id="signin-form" className="landing-form" onSubmit={this.handleRegister} method="post">
          <label className="landing-label">Username:</label>
          <input
            type="email"
            name="username"
            placeholder="email"
            value={this.state.username}
            onChange={this.handleChange} required />          
          <label className="landing-label">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange} required />          
          <button id="login-button" className="landing-submit" type="button" onClick={this.handleLogIn}>Log In</button>
          <button id="register-button" className="landing-submit" type="submit">Register</button>
        </form>

        <p>{renderIf(this.state.signInError, <span className="tooltip">Invalid login.</span>)}</p>
        <p>{renderIf(this.state.signUpError, <span className="tooltip">Username is already taken.</span>)}</p>
      </React.Fragment>
    );
  }
}