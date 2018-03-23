import reducer from '../reducer';
import reporter from '../middleware/redux-reporter';
import thunk from '../middleware/redux-thunk';
import { createStore, applyMiddleware } from 'redux';

let appStoreCreate = () =>
  createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk, reporter));

export default appStoreCreate;