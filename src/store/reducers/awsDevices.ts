import { ActionTypes } from "../actions/types/actionTypes";
import { AwsDeviceAction } from "../actions/types/awsDeviceActions";
import { updateObject } from "../../shared/utility";
import { IAwsDeviceData } from '../actions/types/awsDeviceActions';

// export interface IAwsEachDevice {
//   controllState: string;
//   controllTime: number;
//   controller: string;
//   deviceState: string;
//   id: string
// }

export type TAwsEachDevice = "controllState" | "controllTime" | "controller" | "deviceState" | "id";

export interface IAwsDeviceReducer {
  awsDeviceData: IAwsDeviceData[];
}

const initialState: IAwsDeviceReducer = {
  awsDeviceData: []
};

const reducer = (state = initialState, action: AwsDeviceAction) => {
  switch (action.type) {
    case ActionTypes.SET_AWS_DEVICE_DATA:
      const updatedAwsDeviceData = [...state.awsDeviceData];
      const existingDevice = updatedAwsDeviceData.find(
        device => device.id === action.data.id
      );
      if (!existingDevice) {
        updatedAwsDeviceData.push(action.data);
      } else {
        for (const key in existingDevice) {
          (existingDevice as any)[key] = action.data[key as TAwsEachDevice];
        }
      }
      return updateObject(state, { awsDeviceData: updatedAwsDeviceData });

    default:
      return state;
  }
};

export default reducer;
