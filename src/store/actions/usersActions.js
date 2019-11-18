import axios from "../../axios-api";
import { push } from "connected-react-router";
import { NotificationManager } from "react-notifications";
import config from '../../config'
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from "./actionTypes";

const loginUserSuccess = user => {
  return { type: LOGIN_USER_SUCCESS, user };
};
const loginUserError = error => {
  return { type: LOGIN_USER_ERROR, error };
};

export const loginUser = userData => {
  return dispatch => {
    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?${config.developerName}`, userData).then(
      response => {
        if(response.data.status === 'error') {
            dispatch(loginUserError({message: response.data.message.password } ))
        } else {
            let user = response.data.message
            user.name = userData.get('username')
            dispatch(loginUserSuccess(user));
            dispatch(push("/"));
            NotificationManager.success("Login success");
        }
      },
      error => {
        if (error.response && error.response.data) {
          dispatch(loginUserError(error.response.data));
        } else {
          dispatch(loginUserError({ global: "No internet connection" }));
        }
      }
    );
  };
};

export const logoutUser = () => {
  return (dispatch, getState) => {
    dispatch({ type: LOGOUT_USER });
    dispatch(push("/"));
  };
};
