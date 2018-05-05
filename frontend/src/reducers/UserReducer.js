import * as actionType from '../actions/constants';

const initialState = {
  user: {},
  is_authenticated: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_SIGN_UP: {
      return {
        ...state,
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
