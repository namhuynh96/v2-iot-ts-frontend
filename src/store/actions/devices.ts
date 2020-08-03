import { ActionTypes } from "./types/actionTypes";
import axios from "axios";
import { Dispatch } from "redux";
import { IFetchedDevices } from "./types/deviceActions";

const deviceRequestStart = () => {
  return {
    type: ActionTypes.DEVICE_REQUEST_START
  };
};

const deviceRequestFail = () => {
  return {
    type: ActionTypes.DEVICE_REQUEST_FAIL
  };
};

const fetchDevicesSuccess = (devices: IFetchedDevices[]) => {
  return {
    type: ActionTypes.FETCH_DEVICES_SUCCESS,
    devices
  };
};

export const fetchDevices = (roomId: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(deviceRequestStart());
    axios
      .get<IFetchedDevices[]>(`/api/devices/${roomId}`)
      .then(res => {
        dispatchEvent(fetchDevicesSuccess(res.data));
      })
      .catch(e => dispatchEvent(deviceRequestFail()));
  };
};

const fetchAllDevicesIdSuccess = (devicesId: string[]) => {
  return {
    type: ActionTypes.FETCH_ALL_DEVICES_ID_SUCCESS,
    devicesId
  };
};

export const fetchAllDevicesId = () => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(deviceRequestStart());
    axios
      .get("/api/alldevicesid")
      .then(res => dispatchEvent(fetchAllDevicesIdSuccess(res.data)))
      .catch(e => dispatchEvent(deviceRequestFail()));
  };
};

const addDeviceSuccess = (deviceData: any) => {
  return {
    type: ActionTypes.ADD_DEVICE_SUCCESS,
    deviceData
  };
};

export const addDevice = (
  buildingId: string,
  roomId: string,
  deviceData: {
    name: string;
    configs: {
      type: string; 
      max?: number;
      min?: number;
      step?: number;
      unit?: string;
    }
  }
) => {
  console.log(deviceData)
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(deviceRequestStart());
    axios
      .post(`/api/devices/${buildingId}/${roomId}`, deviceData)
      .then(res => dispatchEvent(addDeviceSuccess(res.data)))
      .catch(e => dispatchEvent(deviceRequestFail()));
  };
};

const updateDeviceSuccess = (deviceData: any) => {
  return {
    type: ActionTypes.UPDATE_DEVICE_SUCCESS,
    deviceData
  };
};

export const updateDevice = (
  roomId: String,
  deviceId: string,
  deviceData: any
) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(deviceRequestStart());
    axios
      .patch(`/api/devices/${roomId}/${deviceId}`, deviceData)
      .then(res => dispatchEvent(updateDeviceSuccess(res.data)))
      .catch(e => dispatchEvent(deviceRequestFail()));
  };
};

export const updateDeviceConfigs = (deviceId: string, configsData: any) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(deviceRequestStart());
    axios
      .patch(`/api/deviceconfigs/${deviceId}`, configsData)
      .then(res => dispatchEvent(updateDeviceSuccess(res.data)))
      .catch(e => dispatchEvent(deviceRequestFail()));
  };
};

const deleteDeviceSuccess = (deviceId: String) => {
  return {
    type: ActionTypes.DELETE_DEVICE_SUCCESS,
    deviceId
  };
};

export const deleteDevice = (deviceId: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(deviceRequestStart());
    axios
      .delete(`/api/devices/${deviceId}`)
      .then(res => dispatchEvent(deleteDeviceSuccess(res.data._id)))
      .catch(e => dispatchEvent(deviceRequestFail()));
  };
};

export const setDevicesToNull = () => {
  return {
    type: ActionTypes.SET_DEVICES_TO_NULL
  };
};
