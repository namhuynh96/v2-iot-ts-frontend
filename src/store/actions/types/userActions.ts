import { ActionTypes } from "./actionTypes";

export interface IUserRequestStart {
  type: ActionTypes.USER_REQUEST_START;
}

export interface IUserRequestFail {
  type: ActionTypes.USER_REQUEST_FAIL;
}

export interface ISetIsAdmin {
  type: ActionTypes.SET_IS_ADMIN;
  isAdmin: boolean;
}

export interface ISetUserData {
  type: ActionTypes.SET_USER_DATA;
  userData: { username: string; isAccepted: boolean; isRequesting: boolean };
}

export interface IRequestToControllSuccess {
  type: ActionTypes.SET_IS_REQUESTING;
  isRequesting: boolean;
}

export interface IFetchAllUsersSuccess {
  type: ActionTypes.FETCH_ALL_USERS_SUCCESS;
  allUsers: any;
}

export interface IUpdateUserSuccess {
  type: ActionTypes.UPDATE_USER_SUCCESS;
  updatedUser: any;
}

export type UserAction =
  | IUserRequestStart
  | IUserRequestFail
  | ISetIsAdmin
  | ISetUserData
  | IRequestToControllSuccess
  | IFetchAllUsersSuccess
  | IUpdateUserSuccess;
