import { combineReducers } from "redux";
// import { reducer as reduxForm } from "redux-form";
import buildingsReducer from "./buildings";
import roomsReducer, { IRoomReducer } from "./rooms";
import devicesReducer, { IDeviceReducer } from "./devices";
import awsDevicesReducer, { IAwsDeviceReducer } from "./awsDevices";
import userReducer, { IUserReducer } from "./user";
import { BuildingList } from "../../types/building";

export interface IStoreState {
  buildings: BuildingList;
  rooms: IRoomReducer;
  devices: IDeviceReducer;
  awsDevices: IAwsDeviceReducer;
  user: IUserReducer;
}

export default combineReducers<IStoreState>({
  // form: reduxForm,
  buildings: buildingsReducer,
  rooms: roomsReducer,
  devices: devicesReducer,
  awsDevices: awsDevicesReducer,
  user: userReducer
});
