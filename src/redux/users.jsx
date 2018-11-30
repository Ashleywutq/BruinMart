import * as ActionTypes from './ActionTypes';

export const Users = (
    state = {
        isLoggedIn: false,
        username: '',
        userInfo: [],
        error: null
    },
    action
) => {
    switch (action.type) {
        case ActionTypes.LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
                userInfo: action.userInfo,
                error: null
            };
        case ActionTypes.LOG_OUT:
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                userInfo: [],
                error: null
            };
        case ActionTypes.ADD_ITEM_USER:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    posts: state.userInfo.posts.concat(action.payload)
                }
            };
        case ActionTypes.SIGN_UP:
            console.log('sign_up');
            return {
                ...state,
                isLoggedIn: true,
                username: action.username,
                password: action.password
            };
        case ActionTypes.LOG_IN_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                username: '',
                userInfo: [],
                error: action.payload
            };
        default:
            return state;
    }
};
