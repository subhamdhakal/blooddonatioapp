import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
import {loginSuccessful} from '../reducers/loginReducer';
const queryString = require('query-string');
export const signup = ({signUpDetails, onSuccess, onFailure}) => {
  return (dispatch) => {
    console.log(JSON.stringify(signUpDetails));
    return axios
      .post(BASE_URL + 'api/v1/registers', signUpDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(loginSuccessful(res.data));

        onSuccess();
      })
      .catch((error) => {
        onFailure(error.response.data.error);
      });
  };
};
