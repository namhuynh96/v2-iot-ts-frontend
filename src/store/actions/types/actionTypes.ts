export enum ActionTypes {
  // BUILDINGS
  BUILDING_REQUEST_START,
  BUILDING_REQUEST_FAIL,

  FETCH_BUILDINGS_SUCCESS,
  ADD_BUILDING_SUCCESS,
  UPDATE_BUILDING_SUCCESS,
  DELETE_BUILDING_SUCCESS,

  SELECT_BUILDING,

  // ROOMS
  ROOM_REQUEST_START,
  ROOM_REQUEST_FAIL,

  FETCH_ROOMS_SUCCESS,
  ADD_ROOM_SUCCESS,
  UPDATE_ROOM_SUCCESS,
  DELETE_ROOM_SUCCESS,

  SELECT_ROOM,

  // DEVICES
  DEVICE_REQUEST_START,
  DEVICE_REQUEST_FAIL,

  FETCH_DEVICES_SUCCESS,
  FETCH_ALL_DEVICES_ID_SUCCESS,
  ADD_DEVICE_SUCCESS,
  UPDATE_DEVICE_SUCCESS,
  DELETE_DEVICE_SUCCESS,

  SET_DEVICES_TO_NULL,

  // AWS DEVICES
  SET_AWS_DEVICE_DATA,

  // USER
  USER_REQUEST_START,
  USER_REQUEST_FAIL,

  SET_IS_ADMIN,
  SET_USER_DATA,
  SET_IS_REQUESTING,
  FETCH_ALL_USERS_SUCCESS,
  UPDATE_USER_SUCCESS
}
