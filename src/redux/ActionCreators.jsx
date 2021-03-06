import * as ActionTypes from './ActionTypes';
import { itemsRef, usersRef } from '../shared/firebase';
import { actions } from 'react-redux-form';

export const filterResults = (searchText, maxResults = 20) => ({
    type: ActionTypes.FILTER,
    payload: {
        searchText: searchText,
        maxResults: maxResults
    }
});

//  This is a thunk

export const fetchItems = () => (dispatch) => {
    dispatch(itemsLoading(true));

    return itemsRef
        .once('value')
        .then((snapshot) => {
            var rawItems = snapshot.val();
            if (rawItems === null) throw Error('Fetch failed.');
            var sellItems = [];
            for (var key in rawItems) {
                if (rawItems.hasOwnProperty(key)) {
                    var item = rawItems[key];
                    item.id = key;
                    sellItems.push(item);
                }
            }
            dispatch(addItems(sellItems));
        })
        .catch((error) => dispatch(itemsFailed(error.message)));
};

export const reserveItem = (key, name, email, tel) => (dispatch) => {
    const reserved = {
        isReserved: true,
        name,
        email,
        tel
    };
    return itemsRef
        .child('/' + key)
        .update({
            reserved
        })
        .then((error) => {
            if (error) throw error;
            dispatch(reserve(key, reserved));
        })
        .catch((error) => {
            dispatch(itemsFailed(error.message));
            alert('Reserved failed! Error: ' + error.message);
        });
};

export const unreserveItem = (key) => (dispatch) => {
    return itemsRef
        .child(`/${key}/reserved/`)
        .update({ isReserved: false })
        .then((error) => {
            if (error) throw error;
            console.log('error checking');
            dispatch(unreserve(key));
        })
        .catch((error) => {
            dispatch(itemsFailed(error.message));
        });
};

export const unreserve = (key) => ({
    type: ActionTypes.UNRESERVE_ITEM,
    payload: key
});

export const reserve = (key, reserved) => ({
    type: ActionTypes.RESERVE_ITEM,
    payload: {
        key,
        reserved
    }
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});

export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const itemsFailed = (err) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: err
});

export const addItem = (item) => ({
    type: ActionTypes.ADD_ITEM,
    payload: item
});

export const addItemToUser = (itemKey) => ({
    type: ActionTypes.ADD_ITEM_USER,
    payload: itemKey
});

export const postItem = (item) => (dispatch) => {
    return itemsRef
        .push(item)
        .then(function(snapshot) {
            item.id = snapshot.key;
            dispatch(addItem(item));
            usersRef.child(item.seller.username + '/posts/').push(item.id);
            dispatch(addItemToUser(item.id));
            alert('Post Successful!');
        })
        .catch((error) => alert('Post failed! Error: ' + error.message));
};

export const fetchUserInfo = (username) => (dispatch) => {
    return usersRef
        .child(username)
        .once('value')
        .then((snapshot) => {
            var userInfo = snapshot.val();
            var posts = [];
            for (var key in userInfo.posts) {
                if (userInfo.posts.hasOwnProperty(key)) {
                    posts.push(userInfo.posts[key]);
                }
            }
            userInfo.posts = posts;
            dispatch(loginUser(username, userInfo));
            dispatch(actions.change('profile.email', userInfo.email));
            dispatch(actions.change('profile.tel', userInfo.tel));
        });
};

export const loginFailed = (error) => ({
    type: ActionTypes.LOG_IN_FAILED,
    payload: error
});

//actions for login logout
export const loginUser = (username, userInfo) => {
    return {
        type: ActionTypes.LOG_IN,
        username: username,
        userInfo: userInfo
    };
};

export const logoutUser = () => ({
    type: ActionTypes.LOG_OUT
});

export const StoreUserInfo = (name, username, password, email, phone) => (dispatch) => {
    return usersRef
        .child(username)
        .update({
            name: name,
            password: password,
            email: email,
            tel: phone,
            avatar: 'assets/images/joe_bruin.jpg',
            posts: []
        })
        .then(() => {
            dispatch(fetchUserInfo(username));
        });
};

export const signup = (username, password) => {
    return {
        type: ActionTypes.SIGN_UP,
        username: username,
        password: password
    };
};
