import { Reducer } from 'react'
import { SET_AUTH_LOADING, UPDATE_USER } from "../actionTypes";
import { ActionType, AuthInitialState } from "@/types";

const authReducer : Reducer<AuthInitialState, ActionType> = (state, action) => {
  switch (action.type) {
    
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        loading: false,
      };
      
    default:
      return state;
  };
};

export default authReducer;