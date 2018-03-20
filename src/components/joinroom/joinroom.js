import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import { renderIf } from '../../lib/utils';
import WaitingRoom from '../waitingroom/waitingroom';
import { connect } from 'react-redux';
import * as roomActions from '../../action/room-action';

// enter the code... emit an event to back end to join the room and redirects to waiting room
class JoinRoom extends Component {
  constructor(props) {
    super(props);
    console.log('joinroom props', this.props);
    this.socket = this.props.socket;

    this.state = {
      code: '',
      nickname: '',
      joinError: '',
      isHost: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.socket.emit('JOIN_ROOM', this.state.code.toUpperCase(), this.state.nickname.toUpperCase());

    this.socket.on('ERROR_JOIN_ROOM', message => {
      this.setState({'joinError': message});
    });

    this.socket.on('JOINED_ROOM', (game, instance) => {
      console.log('game, instance', game, instance);

      let code = this.state.code.toUpperCase();
      let nickname = this.state.nickname.toUpperCase();

      this.props.setRoom({
        code: code,
        nickname: nickname,
        isHost: false,
        game: game,
        instance: instance,
      });

      this.setState({'redirect': true });
    });
  }

  render() {
    return (
      <Fragment>
        <h1>Join Room</h1>

        <form id="joinroom" className="joinroom-form" onSubmit={this.handleSubmit}>
          <label className="joinroom-label">Room Code:</label>
          <input name="code" className="joinroom-input" type="text" placeholder="Room Code" onChange={this.handleChange} required />
          <label className="joinroom-label">Nickname:</label>
          <input name="nickname" className="joinroom-input" type="text" placeholder="Name" onChange={this.handleChange} required />
          <button className="joinroom-submit" type="submit">Join Room</button>
        </form>
        <div id="joinroom-error">{this.state.joinError}</div>

        {renderIf(this.state.redirect, <Redirect to="/waitingroom" />)}
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
});
let mapDispatchToProps = dispatch => ({
  setRoom: room => dispatch(roomActions.roomSet(room)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
