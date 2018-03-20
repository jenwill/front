import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import GameView from '../gameview/gameview';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    console.log('waiting room props', this.props);
    this.socket = this.props.socket;

    this.state = {roomCode: null};
  }

  componentWillMount() {
    this.socket.emit('CREATE_ROOM'); // eslint-disable-line

    this.socket.on('SEND_ROOM', roomCode => { // eslint-disable-line
      this.setState({'roomCode': roomCode});
      console.log('__ROOM_CODE__', this.state.roomCode);
    });
  }

  render() {
    return (
      <Fragment>
        <h1>this.props.gamename or w/e</h1>
        <Link to={{
          pathname: '/gameview',
          roomCode: this.state.roomCode,
          socket: this.socket,
        }}>
          <button type="button" className="startgame-button" id="start-game">Start Game</button>
        </Link>
      </Fragment>
    );
  }
}

export default WaitingRoom;