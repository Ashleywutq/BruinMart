import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import { sellItems } from './items';
import { Users } from './users';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialPost } from './posts';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            sellItems: sellItems,
            users: Users,
            ...createForms({
                newPost: InitialPost
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};
