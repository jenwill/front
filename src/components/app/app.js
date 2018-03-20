import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
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

  componentDidMount() {
    if (this.props.socket)
      store.dispatch({ type: 'SOCKET_SET', payload: this.props.socket });
    localStorage.signInError = false;
    localStorage.signUpError = false;
    // if (localStorage.token)
    //   store.dispatch({ type: 'TOKEN_SET', payload: localStorage.token });
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
                <Route exact path="/choosegame" component={() => store.getState().token ? <ChooseGame /> : <Redirect to="/" />} />
                <Route exact path="/waitingroom" component={() => store.getState().socket ? <WaitingRoom /> : <Redirect to="/" />} />
                <Route exact path="/createquiz" component={() => store.getState().token ? <CreateQuiz /> : <Redirect to="/" />} />
                <Route exact path="/joinroom" component={() => store.getState().socket ? <JoinRoom /> : <Redirect to="/" />}/>
                <Route exact path="/gameview" component={() => store.getState().socket ? <GameView /> : <Redirect to="/" />} />
              </Fragment>
            </div>
          </BrowserRouter>
        </Provider>
      </Fragment>
    );
  }
}


<Route exact path="/dashboard" component={() =>
  store.getState().token
    ? <Dashboard token={token} />
    : <Redirect to="/welcome/signin" />}
/>;

export default App;
