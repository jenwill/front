import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '../../lib/store';

import Navbar from '../navbar/navbar';
import Landing from '../landing/landing';
import ChooseGame from '../choosegame/choosegame';
import CreateQuiz from '../createquiz/createquiz';
import WaitingRoom from '../waitingroom/waitingroom';
import GameView from '../gameview/gameview';
import JoinRoom from '../joinroom/joinroom';
import Disconnected from '../errorview/disconnected';
import About from '../about/about';

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
  }

  render() {
    return (
      <Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <div id="app">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path ="/about" component={About} />
              <Route exact path="/choosegame" component={() => store.getState().token ? <ChooseGame /> : <Redirect to="/" />} />
              <Route exact path="/waitingroom" component={() => store.getState().socket ? <WaitingRoom /> : <Redirect to="/" />} />
              <Route exact path="/createquiz" component={() => store.getState().token ? <CreateQuiz /> : <Redirect to="/" />} />
              <Route exact path="/joinroom" component={() => store.getState().socket ? <JoinRoom /> : <Redirect to="/" />}/>
              <Route exact path="/gameview" component={() => store.getState().socket ? <GameView /> : <Redirect to="/" />} />
              <Route exact path="/error/disconnected" component={() => store.getState().socket ? <Disconnected /> : <Redirect to="/" />} />
            </div>
          </BrowserRouter>
        </Provider>
      </Fragment>
    );
  }
}

export default App;
