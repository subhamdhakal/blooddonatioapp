import {
  LOGIN_FAILED,
  LOGIN_SUCCESSFUL,
  LOGGING_IN,
  SIGNING_UP,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
  SET_UP_ACCESS_TOKEN,
} from '../constants/action-types';

const initialState = {
  users: [],
  loggingIn: false,
  signingUp: false,
  errorMessage: '',
  accessToken: '',
};

function loginReducer(state = initialState, action) {
  if (action.type === LOGIN_FAILED) {
    console.log(action.payload);
  }

  if (action.type === LOGIN_SUCCESSFUL) {
    console.log('in login reducer');

    return {
      ...state,
      users: action.payload,
    };
  }
  if (action.type === LOGGING_IN) {
    return {
      ...state,
      loggingIn: action.payload,
    };
  }

  if (action.type === SIGNING_UP) {
    return {
      ...state,
      signingUp: action.payload,
    };
  }
  if (action.type === SET_UP_ACCESS_TOKEN) {
    return {
      ...state,
      accessToken: action.payload,
    };
  }

  return state;
}

export const performingLogin = (bool) => {
  return {
    type: LOGGING_IN,
    payload: bool,
  };
};
export const loginSuccessful = (data) => {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: data,
    loggingIn: false,
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
    loggingIn: false,
  };
};

export const performingSignUp = (bool) => {
  return {
    type: SIGNING_UP,
    payload: bool,
  };
};
export const signUpSuccessful = (data) => {
  return {
    type: SIGN_UP_SUCCESSFUL,
    payload: data,
    loggingIn: false,
  };
};

export const signUpFailed = (error) => {
  return {
    type: SIGN_UP_FAILED,
    payload: error,
    loggingIn: false,
  };
};

export const setUpAccessToken = (token) => {
  console.log('token in reducer' + token);
  return {
    type: SET_UP_ACCESS_TOKEN,
    payload: token,
  };
};

export default loginReducer;
