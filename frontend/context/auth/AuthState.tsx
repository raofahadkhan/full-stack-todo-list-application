// import services
import { useReducer } from "react";

// import related files
import authReducer from "./authReducer";
import authContext from "./authContext";

// import types
import { ActionType, AuthInitialState, UpdateUserInput } from "@/types";
import { SET_AUTH_LOADING, UPDATE_USER } from "../actionTypes";

// STATE
const AuthState = (props: any) => {
  const initialState : AuthInitialState = {
    user: null,
    loading: false,
  };

  const [state, dispatch] = useReducer<React.Reducer<AuthInitialState, ActionType>>(authReducer, initialState);

  // action to set auth loading
  const set_auth_loading = (value: boolean) => {
    dispatch({
      type: SET_AUTH_LOADING,
      payload: value,
    });
  };

  // action to update user and end loading
  const update_user = (user: UpdateUserInput) => {
    dispatch({
      type: UPDATE_USER,
      payload: user,
    });
  };

  return (
    <authContext.Provider value={{
      user: state.user,
      loading: state.loading,
      set_auth_loading: set_auth_loading,
      update_user: update_user,
    }}>
      { props.children }
    </authContext.Provider>
  );
}
    
    export default AuthState;
    