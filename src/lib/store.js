import reducer from '../reducer';
import reporter from '../middleware/redux-reporter';
import thunk from '../middleware/redux-thunk';
import { createStore, applyMiddleware } from 'redux';

let appStoreCreate = () =>
  createStore(reducer, applyMiddleware(thunk, reporter));

export default appStoreCreate;