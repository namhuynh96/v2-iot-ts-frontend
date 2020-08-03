import { ActionTypes } from "../actions/types/actionTypes";
import { DeviceAction } from "../actions/types/deviceActions";
import { updateObject } from "../../shared/utility";

export interface IDeviceReducer {
  loading: boolean;
  error: boolean;
  devices: null | any[];
  initialDevicesId: string[] | null;
  addedDeviceId: string | null;
}

const initialState: IDeviceReducer = {
  loading: false,
  error: false,
  devices: null,
  initialDevicesId: null,
  addedDeviceId: null
};

const reducer = (state = initialState, action: DeviceAction) => {
  switch (action.type) {
    case ActionTypes.DEVICE_REQUEST_START:
      return updateObject(state, { loading: true });
    case ActionTypes.DEVICE_REQUEST_FAIL:
      return updateObject(state, { loading: false, error: true });

    case ActionTypes.FETCH_DEVICES_SUCCESS:
      return updateObject(state, {
        devices: action.devices,
        loading: false
      });

    case ActionTypes.FETCH_ALL_DEVICES_ID_SUCCESS:
      return updateObject(state, {
        initialDevicesId: action.devicesId
      });

    case ActionTypes.ADD_DEVICE_SUCCESS:
      return updateObject(state, {
        devices: state.devices!.concat(action.deviceData),
        addedDeviceId: action.deviceData._id,
        loading: false
      });

    case ActionTypes.UPDATE_DEVICE_SUCCESS:
      const updatedDevicesArray = state.devices!.map(d => {
        if (d._id === action.deviceData._id) {
          return action.deviceData;
        }
        return d;
      });
      return updateObject(state, {
        devices: updatedDevicesArray,
        loading: false
      });

    case ActionTypes.DELETE_DEVICE_SUCCESS:
      return updateObject(state, {
        devices: state.devices!.filter(d => d._id !== action.deviceId),
        loading: false
      });

    case ActionTypes.SET_DEVICES_TO_NULL:
      return updateObject(state, { devices: null });

    default:
      return state;
  }
};

export default reducer;
