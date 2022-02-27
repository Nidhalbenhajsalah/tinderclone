import { createStore, combineReducers } from 'redux';
import homePage from './pages/Home/reducers';

const reducers = combineReducers({ homePage });

export default createStore(reducers);