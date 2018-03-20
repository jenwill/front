import React, {Component, Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Landing from '../landing/landing';
import ChooseGame from '../choosegame/choosegame';
import CreateQuiz from '../createquiz/createquiz';


class App extends Component {

  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <div className="app">
            <Fragment>
              <Route exact path="/" component={Landing} />
              <Route exact path="/choosegame" component={ChooseGame} />
              <Route exact path="/waitingroom" component={() => <h1>WAITING ROOM PAGE</h1>} />
              <Route exact path="/truthyfalsy" component={() => <h1>TRUTHY FALSY PAGE (GAMEPLAY SCREEN)</h1>} />
              <Route exact path="/createquiz" component={CreateQuiz} />
            </Fragment>
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
