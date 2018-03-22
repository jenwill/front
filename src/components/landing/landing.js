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
    this.joinRoom = this.joinRoom.bind(this);
  }

  redirect(path) {
    this.props.history.push(path);
  }

  joinRoom() {

  }

  showAuthForm() {
    this.setState({ showAuth: true });

    let landingWrapper = document.getElementsByClassName('landing-wrapper')[0];
    let landingForm = document.getElementsByClassName('landing-form')[0];
    let hostButton = document.getElementById('host-game-button');

    hostButton.onclick = function() {
      landingWrapper.classList.add('transition');
      landingForm.classList.add('transition');
      landingForm.classList.add('transitiontwo');
    };
    hostButton.click();
  }

  render() {
    return (
      <Fragment>
        <div id="wrapper">
          <div className="landing-wrapper">
            <header className="landing-header">
              <h1 className="landing-h1" id="landing-h1-one">Sock it</h1>
              <h1 className="landing-h1" id="landing-h1-two">to Me!</h1>
              <h2 className="landing-h2">Play games, <span className="secondary-color">learn</span></h2>
            </header>
            <button type="button" id="host-game-button" className="landing-button" onClick={this.showAuthForm}>Host a Game</button>
            <br />
            <Link to={{ pathname: '/joinroom' }}>
              <button type="button" className="landing-button" onClick={this.joinRoom}>Join a Room</button>
            </Link>
          </div>

          {/* <div className="authform-wrapper"> */}
          <AuthForm
            redirect={this.redirect} login={this.props.signin} register={this.props.signup} />
          {/* </div> */}

          {renderIf(this.state.joinRoomRedirect, <Redirect to="/joinroom" />)}

        </div>
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