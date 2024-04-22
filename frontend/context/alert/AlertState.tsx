// import services
import {useReducer} from 'react';
const { v4: uuidv4 } = require('uuid');

// import alert state files
import alertReducer from "./alertReducer";
import alertContext from "./alertContext";

// import types
import { ActionType, AlertInitialState, AlertInput } from '@/types';
import { ADD_ALERT, CLEAR_ALERT, CLEAR_ALERT_STATE } from '../actionTypes';

// STATE
const AlertState = (props:any) => {
  let initialState : AlertInitialState = {
    alerts: [
      // {
      //   type: AlertType.SUCCESS,
      //   message: "Successfully Login"
      // },
      // {
      //   type: AlertType.ERROR ,
      //   message: "Error 404"
      // }
    ]
  };

  let [ state, dispatch] = useReducer<React.Reducer<AlertInitialState, ActionType>>(alertReducer, initialState);

  // action to add alert in the state
  const add_alert = (alert: AlertInput) => {
    dispatch({
      type: ADD_ALERT,
      payload: {
        id: uuidv4(),
        ...alert,
      }
    });
  }

  // action to clear alert
  const clear_alert = (id: string) => {
    dispatch({
      type: CLEAR_ALERT,
      payload: id,
    })
  };

  // action to clear alert state - on signout
  const clear_alert_state = () => {
    dispatch({
      type: CLEAR_ALERT_STATE,
    })
  }

  return (
    <alertContext.Provider value={{
      alerts: state.alerts,
      add_alert: add_alert,
      clear_alert: clear_alert,
      clear_alert_state: clear_alert_state,
    }}>
      {props.children}
    </alertContext.Provider>
  );

}

export default AlertState;