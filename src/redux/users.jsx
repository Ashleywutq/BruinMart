import * as ActionTypes from './ActionTypes';
import { USERS } from '../shared/users';
import { usersRef } from '../firebase';

export const Users = (
    state = {
        isLoggedIn: false,
        username: '',
        password: '',
        userInfo: []
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
                password: action.password,
                userInfo: action.userInfo
            };
        case ActionTypes.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                password: '',
                userInfo: []
            };
        case ActionTypes.ADD_ITEM_USER:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    posts: state.userInfo.posts.concat(action.payload)
                }
            }
        default:
            return state;
    }
};
