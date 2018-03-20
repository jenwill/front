import reducer from '../reducer';
import reporter from '../middleware/redux-reporter';
import { createStore, applyMiddleware } from 'redux';

let appStoreCreate = () =>
  createStore(reducer, applyMiddleware(reporter));

export default appStoreCreate;