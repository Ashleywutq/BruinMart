import * as MessageTypes from './MessageTypes';
import { usersRef } from './firebase';
import validator from 'validator';

export const checkLoginInfo = (username, password) => {
    return new Promise((callback) => {
        usersRef
            .child(username)
            .once('value')
            .then((snapshot) => {
                var userInfo = snapshot.val();
                if (userInfo === null) {
                    callback(MessageTypes.USER_NOT_EXIST);
                } else if (userInfo.password !== password) {
                    callback(MessageTypes.PASSWORD_WRONG);
                } else {
                    callback(MessageTypes.SUCCESS);
                }
            });
    });
};

const checkUsername = (username) => {
    return new Promise((callback) => {
        usersRef
            .child(username)
            .once('value')
            .then((snapshot) => {
                var userInfo = snapshot.val();
                if (userInfo === null) {
                    callback(MessageTypes.USER_NOT_EXIST);
                } else {
                    callback(MessageTypes.USER_EXISTS);
                }
            });
    });
};

export const doesUsernameExist = (username, callback) => {
    checkUsername(username).then((message) => {
        callback(message === MessageTypes.USER_NOT_EXIST);
    });
};

export const required = (val) =>
    val &&
    !validator.isEmpty(val, {
        ignore_whitespace: true
    });
