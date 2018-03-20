import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '../../lib/store';

// import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing';
import ChooseGame from '../choosegame/choosegame';
import CreateQuiz from '../createquiz/createquiz';
import WaitingRoom from '../waitingroom/waitingroom';
import GameView from '../gameview/gameview';
import JoinRoom from '../joinroom/joinroom';

const store = createStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { socket: this.props.socket };
  }

  componentWillMount() {
    if (this.props.socket)
      store.dispatch({ type: 'SOCKET_SET', payload: this.props.socket });

    if (localStorage.token)
      store.dispatch({ type: 'TOKEN_SET', payload: localStorage.token });
  }

  componentDidMount() {
    localStorage.signInError = false;
    localStorage.signUpError = false;
  }

  render() {
    const waitingRoomComponent = props => {
      return (
        <WaitingRoom socket={this.getState().socket} />
      );
    };

    const landingComponent = props => {
      return (
        <Landing socket={this.getState().socket} />
      );
    };

    return (
      <Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <div className="app">
              <Fragment>
                <Route exact path="/" component={Landing} />
                <Route exact path="/choosegame" component={ChooseGame} />
                <Route exact path="/waitingroom" component={WaitingRoom} />
                {/* <Route exact path="/truthyfalsy" component={() => <h1>TRUTHY FALSY PAGE (GAMEPLAY SCREEN)</h1>} /> */}
                <Route exact path="/createquiz" component={CreateQuiz} />
                <Route exact path="/joinroom" component={JoinRoom} />
                <Route exact path="/gameview" component={GameView} />
              </Fragment>
            </div>
          </BrowserRouter>
        </Provider>
      </Fragment>
    );
  }
}

export default App;
