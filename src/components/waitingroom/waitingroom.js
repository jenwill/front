import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import { renderIf } from '../../lib/utils';
import GameView from '../gameview/gameview';
import { connect } from 'react-redux';
import * as roomActions from '../../action/room-action';
import * as socketActions from '../../action/socket-action';
import * as soundActions from '../../action/sound-action';
import {Howl, Howler} from 'howler';
import sounds from '../../lib/sounds';

const lobbymusic = new Howl({
  src: [sounds.lobbymusic],
  loop: true,
});


class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    this.game = this.props.room.game;
    this.instance = this.props.room.instance;
    this.isHost = this.props.room.isHost;
    this.backgroundSound = this.props.backgroundSound;

    console.log('waitingroom props', this.props);
    this.state = {
      numPlayers: 0,
      playerNames: [],
      redirectToGameView: false,
      redirectToErrorView: false,
    };

    this.handleMute = this.handleMute.bind(this);
  }

  componentWillUnmount() {
    if(this.isHost) {
      lobbymusic.stop();
    }
  }

  componentWillMount() {
    // if isHost is true
    if (this.isHost) {
      
      if(this.props.backgroundSound === null) {
        this.props.setSound(this.props.backgroundSound);
      } 
      lobbymusic.play();

      // creating a room
      this.socket.emit('CREATE_ROOM', this.game, this.instance); 

      // receiving a room w/code back from back end
      this.socket.on('SEND_ROOM', data => { 
        data = JSON.parse(data);
        let {roomCode, game, maxPlayers, roomHost} = data;

        this.props.setRoom({
          code: roomCode,
          game: game,
          instance: this.instance,
          isHost: this.isHost,
          maxPlayers: maxPlayers,
          roomHost: roomHost,
        });

        this.socket.room = roomCode;
        let socket = this.socket;

        this.props.setSocket(socket);

        console.log('__ROOM_CODE__', this.props.room.code);
      });
    }
    else console.log('Is not host');

    // update number of players in waiting room
    this.socket.on('TRACK_PLAYERS', (num, names) => {
      this.setState({
        numPlayers: num,
        playerNames: names,
      });
    });

    // listens for when host clicks start game, redirects players to gameview
    this.socket.on('REDIRECT', path => {
      this.setState({ redirectToGameView: true });
    });

    // if the host disconnects, redirects to errorview
    this.socket.on('REDIRECT_DISCONNECT', () => {
      this.setState({ redirectToErrorView: true });
    });
  }

  handleMute() {
    if (this.props.backgroundSound.backgroundSound) {
      lobbymusic.mute(true);
      this.props.toggleSound(this.props.backgroundSound);
    } else {
      lobbymusic.mute(false);
      this.props.toggleSound(this.props.backgroundSound);
    }
  }

  // componentWillUnmount() {
  //   this.socket.emit('LEAVE_ROOM', this.props.room.code);
  // }

  render() {
    return (
      <Fragment>
        <h1>waiting room: {this.props.room.game}</h1>

        Room Code: {this.props.room.code}<br />
        Players in Room: {this.state.numPlayers}<br />
        Max Players: {this.props.room.maxPlayers}<br />
        Players: {renderIf(this.state.numPlayers === 0, 'none yet!')} {this.state.playerNames.join(', ')}
        <br />
        {renderIf(this.isHost && this.state.numPlayers > 0, <Link to={{
          pathname: '/gameview',
          // socket: this.socket,
          // game: this.game,
          // instance: this.instance,
          // isHost: this.isHost,
          // roomCode: this.props.room.code,
        }}>
          <button type="button" className="startgame-button" id="start-game">Start Game</button>
        </Link>)}

        {renderIf(this.state.redirectToGameView, <Redirect to="/gameview" />)}
        {renderIf(this.state.redirectToErrorView, <Redirect to="/error/disconnected" />)}
        <button onClick={this.handleMute}>mute</button>
      </Fragment>
    );
  }
}

let mapStateToProps = state => ({
  room: state.room,
  socket: state.socket,
  backgroundSound: state.backgroundSound,
});
let mapDispatchToProps = dispatch => ({
  setRoom: room => dispatch(roomActions.roomSet(room)),
  setSocket: socket => dispatch(socketActions.socketSet(socket)),
  toggleSound: backgroundSound => dispatch(soundActions.toggleSound(backgroundSound)),
  setSound: backgroundSound => dispatch(soundActions.setSound(backgroundSound)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
