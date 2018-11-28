import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { sellItems } from './items';
import { Users } from './users';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            sellItems: sellItems,
            users: Users
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};
