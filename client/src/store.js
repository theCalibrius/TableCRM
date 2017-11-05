import { applyMiddleware, createStore } from 'redux';
import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

const middleware = applyMiddleware(reduxPromise, thunk, logger); // Dev
// const middleware = applyMiddleware(reduxPromise, thunk); //Prod

export default createStore(reducers, middleware);
