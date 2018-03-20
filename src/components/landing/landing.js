import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { signupRequest, signinRequest } from '../../action/auth-action';
import AuthForm from '../auth/auth-form';
import { renderIf } from '../../lib/utils';

class Landing extends Component {
  constructor(props) {
    super(props);
    console.log('landing props', this.props);

    this.state = {
      showAuth: false,
    };

    console.log('state', this.state);
    this.redirect = this.redirect.bind(this);
    this.showAuthForm = this.showAuthForm.bind(this);
  }

  redirect(path) {
    this.props.history.push(path);
  }

  showAuthForm() {
    this.setState({showAuth: true});
  }

  render() {
    // let { params } = this.props.match;
    // let onComplete = params.auth === 'signin'
    //   ? this.props.signin
    //   : this.props.signup;

    return (
      <Fragment>
        <h1 className="landing-h1">Sock it to me!</h1>
        <button type="button" className="landing-button" onClick={this.showAuthForm}>Log in as host</button>

        <Link to={{
          pathname: '/joinroom',
        }}>
          <button type="button" className="landing-button">Join room as player (will log you out as a host)</button>
        </Link>

        {renderIf(this.state.showAuth, <AuthForm
          redirect={this.redirect} login={this.props.signin} register={this.props.signup} />)}
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
  token: state.token,
});
let mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signupRequest(user)),
  signin: user => dispatch(signinRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);