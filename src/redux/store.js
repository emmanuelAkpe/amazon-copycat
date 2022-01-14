import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';  // for what functions we are dispatching from the react component
import thunk from 'redux-thunk';    // all the sideeffct we are handling with  redux thunk

import rootReducer  from './root-reducer'

const middleware = [thunk];

if(process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;