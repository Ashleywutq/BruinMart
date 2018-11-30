import * as ActionTypes from './ActionTypes';
import { itemsRef, usersRef } from '../firebase';

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
            console.log(rawItems);
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

export const reserveItem = (key) => (dispatch) => {
    return itemsRef
        .child('/' + key)
        .update({ reserved: true })
        .then((error) => {
            if (error) throw error;
            console.log('error checking');
            dispatch(reserve(key));
            alert("Reserved Successful!");
        })
        .catch((error) => {
            dispatch(itemsFailed(error.message));
            alert("Reserved failed! Error: " + error.message);
        });
};

export const reserve = (key) => ({
    type: ActionTypes.RESERVE_ITEM,
    payload: key
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
    return itemsRef.push(item).then(function(snapshot) {
        item.id = snapshot.key;
        dispatch(addItem(item));
        usersRef.child(item.username + '/posts/').push(item.id);
        dispatch(addItemToUser(item.id));
        alert('Post Successful!');
    }).catch((error) => alert('Post failed! Error: ' + error.message));
};

export const fetchUserInfo = (username, password) => (dispatch) => {
    return usersRef
        .child(username)
        .once('value')
        .then((snapshot) => {
            var userInfo = snapshot.val();
            if (userInfo === null) {
                alert('Username does not exist.');
                throw Error('Username does not exist.');
            }

            if (userInfo.password !== password) {
                alert('Password is wrong!');
                throw Error('Password is wrong!');
            }

            var posts = [];
            for (var key in userInfo.posts) {
                if (userInfo.posts.hasOwnProperty(key)) {
                    posts.push(userInfo.posts[key]);
                }
            }
            userInfo.posts = posts;
            dispatch(login(username, password, userInfo));
        })
        .catch((error) => {
            dispatch(loginFailed(error.message));
        });
};

export const loginFailed = (error) => ({
    type: ActionTypes.LOG_IN_FAILED,
    payload: error
});

//actions for login logout
export const login = (username, password, userInfo) => {
    return {
        type: ActionTypes.LOG_IN,
        username: username,
        password: password,
        userInfo: userInfo
    };
};

export const logout = () => {
    return {
        type: ActionTypes.LOG_OUT
    };
};

export const StoreUserInfo = (username, password, email, phone) => (dispatch) => {
    console.log(phone);
    return usersRef
        .child(username)
        .update({
            password: password,
            email: email,
            tel: phone,
            avatar: 'assets/images/joe_bruin.jpg',
            posts: []
        })
        .then(() => {
            dispatch(fetchUserInfo(username, password));
        });
};

export const signup = (username, password) => {
    return {
        type: ActionTypes.SIGN_UP,
        username: username,
        password: password
    };
};
