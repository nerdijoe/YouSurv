import * as actionType from '../actions/constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  user: {},
  is_authenticated: false,
  error: null,
  savepath: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UNLOAD: {
      console.log("location change");
      return {
        ...state,
        error: null
      }
    }
    case actionType.SAVEPATH: {
      console.log("location path");
      return {
        ...state,
        savepath: action.data
      }
    }
    case actionType.USER_SIGN_UP: {
      return {
        ...state,
      };
    }
    case actionType.USER_SIGN_UP_FAIL: {
      return {
        ...state,
        error: action.data
      };
    }
    case actionType.USER_SIGN_IN: {
      return {
        ...state,
        user: {
          email: action.data.email,
        },
        is_authenticated: true,
      };
    }
    case actionType.USER_SIGN_IN_FAIL: {
      return {
        ...state,
        error: action.data
      };
    }
    case actionType.USER_SIGN_OUT: {
      return {
        ...state,
        user: {},
        is_authenticated: false,
      };
    }

    default:
      return state;
  }
}

export default UserReducer;
