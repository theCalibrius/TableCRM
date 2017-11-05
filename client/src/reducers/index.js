import { combineReducers } from 'redux';
import opportunitiesReducer from './opportunitiesReducer';
import leadsReducer from './leadsReducer';
import contactsReducer from './contactsReducer';

export default combineReducers({
  opportunitiesReducer,
  leadsReducer,
  contactsReducer
});
