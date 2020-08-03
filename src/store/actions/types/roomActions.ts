import { ActionTypes } from "./actionTypes";

export interface IRoomRequestStart {
  type: ActionTypes.ROOM_REQUEST_START;
}

export interface IRoomRequestFail {
  type: ActionTypes.ROOM_REQUEST_FAIL;
}

export interface IFetchRoomsSuccess {
  type: ActionTypes.FETCH_ROOMS_SUCCESS;
  rooms: any[];
}

export interface IAddRoomSuccess {
  type: ActionTypes.ADD_ROOM_SUCCESS;
  roomData: any;
}

export interface IUpdateRoomSuccess {
  type: ActionTypes.UPDATE_ROOM_SUCCESS;
  roomData: any;
}

export interface IDeleteRoomSuccess {
  type: ActionTypes.DELETE_ROOM_SUCCESS;
  roomId: string;
}

export interface ISelectRoom {
  type: ActionTypes.SELECT_ROOM;
  roomId: string;
}

export type RoomAction =
  | IRoomRequestStart
  | IRoomRequestFail
  | IFetchRoomsSuccess
  | IAddRoomSuccess
  | IUpdateRoomSuccess
  | IDeleteRoomSuccess
  | ISelectRoom;
