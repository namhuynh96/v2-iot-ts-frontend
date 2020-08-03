import { ActionTypes } from "./types/actionTypes";
import axios from "axios";
import { Dispatch } from "redux";

const userRequestStart = () => {
  return {
    type: ActionTypes.USER_REQUEST_START
  };
};

const userRequestFail = () => {
  return {
    type: ActionTypes.USER_REQUEST_FAIL
  };
};

const setIsAdmin = (isAdmin: boolean) => {
  return {
    type: ActionTypes.SET_IS_ADMIN,
    isAdmin
  };
};

const setUserData = (
  username: string,
  isAccepted: boolean,
  isRequesting: boolean
) => {
  return {
    type: ActionTypes.SET_USER_DATA,
    userData: { username, isAccepted, isRequesting }
  };
};

export const setAdminOrUserData = () => {
  return (dispatch: Dispatch) => {
    dispatch(userRequestStart());
    axios
      .get("/api/users")
      .then(res => {
        if (res.data.isAdmin) {
          dispatch(setIsAdmin(true));
        } else {
          const { username, email, isAccepted, isRequesting } = res.data;
          dispatch(
            setUserData(username ? username : email, isAccepted, isRequesting)
          );
        }
      })
      .catch(e => {
        dispatch(userRequestFail());
      });
  };
};

const requestToControllSuccess = (isRequesting: boolean) => {
  return {
    type: ActionTypes.SET_IS_REQUESTING,
    isRequesting
  };
};

export const requestToControll = (cognitoIdentityId: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(userRequestStart());
    axios
      .post("/api/requestControll", { cognitoIdentityId })
      .then(res =>
        dispatchEvent(requestToControllSuccess(res.data.isRequesting))
      )
      .catch(e => dispatchEvent(userRequestFail()));
  };
};

const fetchAllUsersSuccess = (allUsers: any) => {
  return {
    type: ActionTypes.FETCH_ALL_USERS_SUCCESS,
    allUsers
  };
};

export const fetchAllUsers = (query: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(userRequestStart());
    axios
      .get("/api/allUsers" + query)
      .then(res => {
        dispatchEvent(fetchAllUsersSuccess(res.data));
      })
      .catch(e => dispatchEvent(userRequestFail()));
  };
};

const updateUserSuccess = (updatedUser: any) => {
  return {
    type: ActionTypes.UPDATE_USER_SUCCESS,
    updatedUser
  };
};

export const acceptUser = (id: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(userRequestStart());
    axios
      .patch("/api/acceptUser/" + id)
      .then(res => dispatchEvent(updateUserSuccess(res.data)))
      .catch(e => dispatchEvent(userRequestFail()));
  };
};

export const detachUser = (id: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(userRequestStart());
    axios
      .patch("/api/detachUser/" + id)
      .then(res => dispatchEvent(updateUserSuccess(res.data)))
      .catch(e => dispatchEvent(userRequestFail()));
  };
};
