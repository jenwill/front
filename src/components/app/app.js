import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing';
import ChooseGame from '../choosegame/choosegame';
import CreateQuiz from '../createquiz/createquiz';
import WaitingRoom from '../waitingroom/waitingroom';
import GameView from '../gameview/gameview';

class App extends Component {

  render() {
    const waitingRoomComponent = props => {
      return (
        <WaitingRoom socket={this.props.socket} />
      );
    };

    return (
      <Fragment>
        <BrowserRouter>
          <div className="app">
            <Fragment>
              <Route exact path="/" component={Landing} />
              <Route exact path="/choosegame" component={ChooseGame} />
              <Route exact path="/waitingroom" component={waitingRoomComponent} />
              <Route exact path="/truthyfalsy" component={() => <h1>TRUTHY FALSY PAGE (GAMEPLAY SCREEN)</h1>} />
              <Route exact path="/createquiz" component={CreateQuiz} />
              <Route path="/gameview/" component={GameView} />
            </Fragment>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
