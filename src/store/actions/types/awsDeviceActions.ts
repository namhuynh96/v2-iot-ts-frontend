import { ActionTypes } from "./actionTypes";

export interface IAwsDeviceData {
  controllState: string | null;
  controllTime: number | null;
  controller: string | null;
  deviceState: string | null;
  id: string;
}

interface ISetAwsDeviceData {
  type: ActionTypes.SET_AWS_DEVICE_DATA;
  data: IAwsDeviceData;
}

export type AwsDeviceAction = ISetAwsDeviceData;
