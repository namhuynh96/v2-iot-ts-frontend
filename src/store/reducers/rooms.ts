import { ActionTypes } from "../actions/types/actionTypes";
import { RoomAction } from "../actions/types/roomActions";
import { updateObject } from "../../shared/utility";

export interface IRoomReducer {
  rooms: null | any[];
  selectedRoomId: null | string;
  loading: boolean;
  error: boolean;
}

const initialState: IRoomReducer = {
  rooms: null,
  selectedRoomId: null,
  loading: false,
  error: false
};

const reducer = (state = initialState, action: RoomAction) => {
  switch (action.type) {
    case ActionTypes.ROOM_REQUEST_START:
      return updateObject(state, { loading: true });
    case ActionTypes.ROOM_REQUEST_FAIL:
      return updateObject(state, { loading: false, error: true });

    case ActionTypes.FETCH_ROOMS_SUCCESS:
      const { rooms } = action;
      return updateObject(state, {
        rooms,
        selectedRoomId: rooms.length ? rooms[0]._id : null,
        loading: false
      });

    case ActionTypes.ADD_ROOM_SUCCESS:
      return updateObject(state, {
        rooms: state.rooms!.concat(action.roomData),
        loading: false
      });

    case ActionTypes.UPDATE_ROOM_SUCCESS:
      const updatedRooms = state.rooms!.map(r => {
        if (r._id === action.roomData._id) {
          return action.roomData;
        }
        return r;
      });
      return updateObject(state, {
        rooms: updatedRooms,
        loading: false
      });

    case ActionTypes.DELETE_ROOM_SUCCESS:
      return updateObject(state, {
        rooms: state.rooms!.filter(r => r._id !== action.roomId),
        loading: false
      });

    case ActionTypes.SELECT_ROOM:
      return updateObject(state, {
        selectedRoomId: action.roomId
      });

    default:
      return state;
  }
};

export default reducer;
