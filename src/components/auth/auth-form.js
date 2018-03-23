import React from 'react';
import { renderIf } from '../../lib/utils';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      signInError: localStorage.signInError,
      signUpError: localStorage.signUpError,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentWillUnmount() {
    localStorage.signInError = false;
    localStorage.signUpError = false;
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
            signInError: localStorage.signInError,
            signUpError: localStorage.signUpError,
          });
          return; 
        }
        this.props.redirect('/choosegame');
      })
      .catch(err => {
        this.setState({
          signInError: localStorage.signInError,
          signUpError: localStorage.signUpError,
        });
        console.log(err);
      });

    this.setState({
      signInError: localStorage.signInError,
      signUpError: localStorage.signUpError,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    let { username, password } = this.state;
    this.props.register({ username, password })
      .then((res) => {
        if (res === 'invalid') {
          this.setState({
            signInError: localStorage.signInError,
            signUpError: localStorage.signUpError,
          });
          return;
        }
        this.props.redirect('/choosegame');
      })
      .catch(err => {
        this.setState({
          signInError: localStorage.signInError,
          signUpError: localStorage.signUpError,
        });
        console.log(err);
      });

    this.setState({
      signInError: localStorage.signInError,
      signUpError: localStorage.signUpError,
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="landing-form" onSubmit={this.handleRegister} method="post">
          <label className="landing-label">Email</label>
          <input
            className="landing-input"
            type="email"
            name="username"
            placeholder="email"
            value={this.state.username}
            onChange={this.handleChange} required />          
          <label className="landing-label">Password</label>
          <input
            className="landing-input"
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange} required />          
          <button id="login-button" className="submit" type="button" onClick={this.handleLogIn}>Log In</button>
          <button id="register-button" className="submit" type="submit">Register</button>
        </form>
        <div className="center">
          {renderIf(this.state.signInError === 'true', <span className="tooltip">Invalid login.</span>)}
          {renderIf(this.state.signUpError === 'true', <span className="tooltip">Username is already taken.</span>)}
        </div>
      </React.Fragment>
    );
  }
}