import { ActionTypes } from "../actions/types/actionTypes";
import { UserAction } from "../actions/types/userActions";
import { updateObject } from "../../shared/utility";

export interface IUserReducer {
  loading: boolean;
  error: boolean;
  isAdmin: boolean;
  userData: {
    username: null | string;
    isAccepted: boolean;
    isRequesting: boolean;
  };
  allUsers: any[];
}

const initialState: IUserReducer = {
  loading: false,
  error: false,
  isAdmin: false,
  userData: {
    username: null,
    isAccepted: false,
    isRequesting: false
  },
  allUsers: []
};

const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionTypes.USER_REQUEST_START:
      return updateObject(state, { loading: true });
    case ActionTypes.USER_REQUEST_FAIL:
      return updateObject(state, { loading: false, error: true });

    case ActionTypes.SET_IS_ADMIN:
      return updateObject(state, { isAdmin: action.isAdmin, loading: false });

    case ActionTypes.SET_USER_DATA:
      const updatedUserData = updateObject(state.userData, action.userData);
      return updateObject(state, {
        userData: updatedUserData,
        loading: false
      });

    case ActionTypes.SET_IS_REQUESTING:
      const updatedUserData_ = updateObject(state.userData, {
        isRequesting: action.isRequesting
      });
      return updateObject(state, {
        userData: updatedUserData_,
        loading: false
      });

    case ActionTypes.FETCH_ALL_USERS_SUCCESS:
      return updateObject(state, { allUsers: action.allUsers });

    case ActionTypes.UPDATE_USER_SUCCESS:
      let updatedAllUsers = [...state.allUsers];
      const user = updatedAllUsers.find(
        user => user._id === action.updatedUser._id
      );
      for (const key in action.updatedUser) {
        user[key] = action.updatedUser[key];
      }
      return updateObject(state, { allUsers: updatedAllUsers });

    default:
      return state;
  }
};

export default reducer;
