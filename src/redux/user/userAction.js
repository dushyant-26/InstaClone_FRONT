import {
  DELETE_USER,
  SAVE_USER,
  UPDATE_PROFILE_PIC,
  UPDATE_USER_FOLLOW,
} from "./userType";

export const saveUser = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};

export const updateFollow = (following, followers) => {
  return {
    type: UPDATE_USER_FOLLOW,
    payload: { following, followers },
  };
};

export const updateProfilePic = (pic) => {
  return {
    type: UPDATE_PROFILE_PIC,
    payload: pic,
  };
};
