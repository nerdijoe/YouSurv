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
        is_authenticated: true,
      };
    }
    default:
      return state;
  }
}

export default UserReducer;
