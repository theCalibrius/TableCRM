import { combineReducers } from 'redux';
import opportunitiesReducer from './opportunitiesReducer';
import leadsReducer from './leadsReducer';
import contactsReducer from './contactsReducer';
import accountsReducer from './accountsReducer';

// combineReducers - key value pair (es6 makes it only one variable)
export default combineReducers({
  opportunitiesReducer,
  leadsReducer,
  contactsReducer,
  accountsReducer
});

