import { ActionTypes } from "./types/actionTypes";
import axios from "axios";
import { Dispatch } from "redux";
import { Building } from "../../types/building";
import * as BuildingActionTypes from "./types/buildingActions";

const buildingRequestStart: () => BuildingActionTypes.IBuildingRequestStart = () => ({
  type: ActionTypes.BUILDING_REQUEST_START
});

const buildingRequestFail: () => BuildingActionTypes.IBuildingRequestFail = () => {
  return {
    type: ActionTypes.BUILDING_REQUEST_FAIL
  };
};

const fetchBuildingsSuccess: (
  buildings: Building[]
) => BuildingActionTypes.IFetchBuildingsSuccess = buildings => {
  return {
    type: ActionTypes.FETCH_BUILDINGS_SUCCESS,
    buildings
  };
};

export const fetchBuildings = () => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(buildingRequestStart());
    axios
      .get("/api/buildings")
      .then(res => {
        dispatchEvent(fetchBuildingsSuccess(res.data));
      })
      .catch(e => dispatchEvent(buildingRequestFail()));
  };
};

const addBuildingSuccess: (
  building: Building
) => BuildingActionTypes.IAddBuildingSuccess = building => {
  return {
    type: ActionTypes.ADD_BUILDING_SUCCESS,
    building
  };
};

export const addBuilding = (name: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(buildingRequestStart());
    axios
      .post("/api/buildings", { name })
      .then(res => {
        dispatchEvent(addBuildingSuccess(res.data));
      })
      .catch(e => dispatchEvent(buildingRequestFail()));
  };
};

const updateBuildingSuccess: (
  building: Building
) => BuildingActionTypes.IUpdateBuildingSuccess = building => {
  return {
    type: ActionTypes.UPDATE_BUILDING_SUCCESS,
    building
  };
};

export const updateBuilding = (buildingId: string, name: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(buildingRequestStart());
    axios
      .patch(`/api/buildings/${buildingId}`, { name })
      .then(res => {
        dispatchEvent(updateBuildingSuccess(res.data));
      })
      .catch(e => dispatchEvent(buildingRequestFail()));
  };
};

const deleteBuildingSuccess: (
  buidlingId: string
) => BuildingActionTypes.IDeleteBuildingSuccess = buildingId => {
  return {
    type: ActionTypes.DELETE_BUILDING_SUCCESS,
    buildingId
  };
};

export const deleteBuilding = (buildingId: string) => {
  return (dispatchEvent: Dispatch) => {
    dispatchEvent(buildingRequestStart());
    axios
      .delete(`/api/buildings/${buildingId}`)
      .then(res => {
        dispatchEvent(deleteBuildingSuccess(res.data._id));
      })
      .catch(e => dispatchEvent(buildingRequestFail()));
  };
};

export const selectBuilding: (
  buildingId: string
) => BuildingActionTypes.ISelectBuilding = buildingId => {
  return {
    type: ActionTypes.SELECT_BUILDING,
    buildingId
  };
};
