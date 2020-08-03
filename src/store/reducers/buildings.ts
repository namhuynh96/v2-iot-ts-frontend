import { ActionTypes } from "../actions/types/actionTypes";
import { updateObject } from "../../shared/utility";
import { BuildingList } from "../../types/building";
import { BuildingAction } from "../actions/types/buildingActions";

const initialState: BuildingList = {
  buildings: null,
  selectedBuildingId: null,
  loading: false,
  error: false
};

const reducer = (state = initialState, action: BuildingAction): BuildingList => {
  switch (action.type) {
    case ActionTypes.BUILDING_REQUEST_START:
      return updateObject(state, { loading: true });
    case ActionTypes.BUILDING_REQUEST_FAIL:
      return updateObject(state, { loading: false, error: true });

    case ActionTypes.FETCH_BUILDINGS_SUCCESS:
      const { buildings } = action;
      return updateObject(state, {
        buildings,
        selectedBuildingId: buildings.length ? buildings[0]._id : null,
        loading: false
      });

    case ActionTypes.ADD_BUILDING_SUCCESS:
      return updateObject(state, {
        buildings: state.buildings!.concat(action.building),
        loading: false
      });

    case ActionTypes.UPDATE_BUILDING_SUCCESS:
      const updatedBuildings = state.buildings!.map(b => {
        if (b._id === action.building._id) {
          return action.building;
        }
        return b;
      });
      return updateObject(state, {
        buildings: updatedBuildings,
        loading: false
      });

    case ActionTypes.DELETE_BUILDING_SUCCESS:
      return updateObject(state, {
        buildings: state.buildings!.filter(b => b._id !== action.buildingId),
        loading: false
      });

    case ActionTypes.SELECT_BUILDING:
      return updateObject(state, {
        selectedBuildingId: action.buildingId
      });

    default:
      return state;
  }
};

export default reducer;
