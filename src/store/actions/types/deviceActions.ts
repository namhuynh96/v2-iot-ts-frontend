import { ActionTypes } from "./actionTypes";

export interface IDeviceRequestStart {
  type: ActionTypes.DEVICE_REQUEST_START;
}

export interface IDeviceRequestFail {
  type: ActionTypes.DEVICE_REQUEST_FAIL;
}

export interface IFetchedDevices {
  _id: string;
  _buildingId: string;
  _roomId: string;
  name: string;
  configs: {
    type: string;
    max?: number;
    min?: number;
    step?: number;
    unit?: string;
  };
}

export interface IFetchDeviceSuccess {
  type: ActionTypes.FETCH_DEVICES_SUCCESS;
  devices: IFetchedDevices[];
}

export interface IFetchAllDevicesIdSuccess {
  type: ActionTypes.FETCH_ALL_DEVICES_ID_SUCCESS;
  devicesId: string[];
}

export interface IAddDeviceSuccess {
  type: ActionTypes.ADD_DEVICE_SUCCESS;
  deviceData: any;
}

export interface IUpdateDeviceSuccess {
  type: ActionTypes.UPDATE_DEVICE_SUCCESS;
  deviceData: any;
}

export interface IDeleteDeviceSuccess {
  type: ActionTypes.DELETE_DEVICE_SUCCESS;
  deviceId: string;
}

export interface ISetDevicesToNull {
  type: ActionTypes.SET_DEVICES_TO_NULL;
}

export type DeviceAction =
  | IDeviceRequestStart
  | IDeviceRequestFail
  | IFetchDeviceSuccess
  | IFetchAllDevicesIdSuccess
  | IAddDeviceSuccess
  | IUpdateDeviceSuccess
  | IDeleteDeviceSuccess
  | ISetDevicesToNull;
