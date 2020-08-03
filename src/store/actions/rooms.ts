import { ActionTypes } from "../actions/types/actionTypes";
import axios from "axios";
import { Dispatch } from "redux";

const roomRequestStart = () => {
  return {
    type: ActionTypes.ROOM_REQUEST_START
  };
};

const roomRequestFail = () => {
  return {
    type: ActionTypes.ROOM_REQUEST_FAIL
  };
};

const fetchRoomsSuccess = (rooms: any[]) => {
  return {
    type: ActionTypes.FETCH_ROOMS_SUCCESS,
    rooms
  };
};

export const fetchRooms = (buildingId: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(roomRequestStart());
    axios
      .get(`/api/rooms/${buildingId}`)
      .then(res => {
        dispatchEvent(fetchRoomsSuccess(res.data));
      })
      .catch(e => dispatchEvent(roomRequestFail()));
  };
};

const addRoomSuccess = (roomData: any) => {
  return {
    type: ActionTypes.ADD_ROOM_SUCCESS,
    roomData
  };
};

export const addRoom = (buildingId: string, roomName: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(roomRequestStart());
    axios
      .post(`/api/rooms/${buildingId}`, { name: roomName })
      .then(res => {
        dispatchEvent(addRoomSuccess(res.data));
      })
      .catch(e => dispatchEvent(roomRequestFail()));
  };
};

const updateRoomSuccess = (roomData: any) => {
  return {
    type: ActionTypes.UPDATE_ROOM_SUCCESS,
    roomData
  };
};

export const updateRoom = (buildingId: string, roomId: string, roomName: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(roomRequestStart());
    axios
      .patch(`/api/rooms/${buildingId}/${roomId}`, { name: roomName })
      .then(res => {
        dispatchEvent(updateRoomSuccess(res.data));
      })
      .catch(e => dispatchEvent(roomRequestFail()));
  };
};

const deleteRoomSuccess = (roomId: string) => {
  return {
    type: ActionTypes.DELETE_ROOM_SUCCESS,
    roomId
  };
};

export const deleteRoom = (roomId: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(roomRequestStart());
    axios
      .delete(`/api/rooms/${roomId}`)
      .then(res => {
        dispatchEvent(deleteRoomSuccess(res.data._id));
      })
      .catch(e => dispatchEvent(roomRequestFail()));
  };
};

export const selectRoom = (roomId: string) => {
  return {
    type: ActionTypes.SELECT_ROOM,
    roomId
  };
};
