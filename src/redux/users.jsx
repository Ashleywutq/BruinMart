import { USERS } from '../shared/users';
import { usersRef } from '../firebase';

export const Users = (state = USERS, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
