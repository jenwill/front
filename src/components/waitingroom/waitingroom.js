import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import { renderIf } from '../../lib/utils';
import GameView from '../gameview/gameview';
import { connect } from 'react-redux';
import * as roomActions from '../../action/room-action';

class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    this.game = this.props.room.game;
    this.instance = this.props.room.instance;
    this.isHost = this.props.room.isHost;

    console.log('waitingroom props', this.props);
    this.state = {
      numPlayers: 0,
    };
  }

  componentWillMount() {
    // if isHost is true
    if (this.isHost) {
      // creating a room
      this.socket.emit('CREATE_ROOM', this.game, this.instance); 

      // receiving a room w/code back from back end
      this.socket.on('SEND_ROOM', data => { 
        data = JSON.parse(data);
        let {roomCode, game} = data;

        this.props.setRoom({
          code: roomCode,
          game: game,
          instance: this.instance,
          isHost: this.isHost,
        });

        console.log('__ROOM_CODE__', this.props.room.code);
      });
    }
    else console.log('is not host');
  }

  render() {
    return (
      <Fragment>
        <h1>waiting room: {this.props.room.game}</h1>

        {renderIf(this.isHost, <Link to={{
          pathname: '/gameview',
          game: this.game,
          instance: this.instance,
          isHost: this.isHost,
          roomCode: this.props.room.code,
          socket: this.socket,
        }}>
          <button type="button" className="startgame-button" id="start-game">Start Game</button>
        </Link>)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
