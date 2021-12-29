import {
  DELETE_USER,
  SAVE_USER,
  UPDATE_PROFILE_PIC,
  UPDATE_USER_FOLLOW,
} from "./userType";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        user: null,
      };
    case UPDATE_USER_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.payload.followers,
          following: action.payload.following,
        },
      };
    case UPDATE_PROFILE_PIC:
      return {
        ...state,
        user: {
          ...state.user,
          profilePic: action.payload,
        },
      };
    default:
      return state;
  }
};
