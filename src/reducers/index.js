import { combineReducers } from 'redux';
import opportunitiesReducer from './opportunitiesReducer';
import leadsReducer from './leadsReducer';

export default combineReducers({
  opportunitiesReducer,
  leadsReducer
});
