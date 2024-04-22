import { ActionType, AlertInitialState } from '@/types';
import { Reducer } from 'react'
import { ADD_ALERT, CLEAR_ALERT, CLEAR_ALERT_STATE } from '../actionTypes';

const alertReducer:Reducer<AlertInitialState, ActionType> = (state , action) => {
  switch (action.type) {

    case ADD_ALERT:
      return {
        ...state,
        alerts: [
          ...state.alerts,
          action.payload
        ]
      };

    case CLEAR_ALERT:
      const filtered_alerts = state.alerts.filter(alert => alert.id !== action.payload);
      return {
        ...state,
        alerts: filtered_alerts,
      };
     
    case CLEAR_ALERT_STATE:
      return {
        alerts: [],
      };

    default:
      return state;
  }
}

export default alertReducer;