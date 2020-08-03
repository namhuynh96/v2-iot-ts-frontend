import { Building } from "../../../types/building";
import { ActionTypes } from "./actionTypes";

export interface IBuildingRequestStart {
  type: ActionTypes.BUILDING_REQUEST_START;
}

export interface IBuildingRequestFail {
  type: ActionTypes.BUILDING_REQUEST_FAIL;
}

export interface IFetchBuildingsSuccess {
  type: ActionTypes.FETCH_BUILDINGS_SUCCESS;
  buildings: Building[];
}

export interface IAddBuildingSuccess {
  type: ActionTypes.ADD_BUILDING_SUCCESS;
  building: Building;
}

export interface IUpdateBuildingSuccess {
  type: ActionTypes.UPDATE_BUILDING_SUCCESS;
  building: Building;
}

export interface IDeleteBuildingSuccess {
  type: ActionTypes.DELETE_BUILDING_SUCCESS;
  buildingId: string;
}

export interface ISelectBuilding {
  type: ActionTypes.SELECT_BUILDING;
  buildingId: string;
}

export type BuildingAction =
  | IBuildingRequestStart
  | IBuildingRequestFail
  | IFetchBuildingsSuccess
  | IAddBuildingSuccess
  | IUpdateBuildingSuccess
  | IDeleteBuildingSuccess
  | ISelectBuilding;
