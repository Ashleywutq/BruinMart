import * as ActionTypes from "./ActionTypes";
import { USERS } from "../shared/users";
import { usersRef } from "../firebase";

export const Users = (
  state = {
    isLoggedIn: false,
    username: "",
    password: ""
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        username: action.username,
        password: action.password
      };
    case ActionTypes.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: ""
      };
    default:
      return state;
  }
};
