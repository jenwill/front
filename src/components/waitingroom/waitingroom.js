import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';
import { renderIf } from '../../lib/utils';
import GameView from '../gameview/gameview';
import { connect } from 'react-redux';


class WaitingRoom extends Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    // this.game = this.props.game;
    // this.instance = this.props.instance;
    // this.isHost = this.props.isHost
    console.log('waitingroom props', this.props);
    this.isHost = true;
    this.state = {
      game: null,
      roomCode: null,
      numPlayers: 0,
    };
  }

  componentWillMount() {
    // if isHost is true
    if (this.isHost) {
      // creating a room
      let game = 'truthyfalsy';
      let instance = [
        { 'question': 'React is a JS framework.', 'answer': false },
        { 'question': 'Node is based off the Chrome v8 engine.', 'answer': true },
        { 'question': 'JavaScript is single-threaded.', 'answer': true },
      ];
      this.socket.emit('CREATE_ROOM', game, instance); 

      // receiving a room w/code back from back end
      this.socket.on('SEND_ROOM', data => { 
        data = JSON.parse(data);
        let {roomCode, game} = data;
        this.setState({'roomCode': roomCode, 'game': game});
        console.log('__ROOM_CODE__', this.state.roomCode);
      });
    }
    else console.log('is not host');
  }

  render() {
    return (
      <Fragment>
        <h1>waiting room: {this.state.game}</h1>

        {renderIf(this.isHost, <Link to={{
          pathname: '/gameview',
          game: this.state.game,
          //   instance: this.instance,
          isHost: this.isHost,
          roomCode: this.state.roomCode,
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

});

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom);
