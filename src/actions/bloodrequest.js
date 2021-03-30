import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
const queryString = require('query-string');
import {loginSuccessful} from '../reducers/loginReducer';

export const login = ({email, password, onSuccess, onFailure}) => {
  console.log('login pressed' + email + password);
  return (dispatch) => {
    return axios
      .post(BASE_URL + 'api/v1/blood-request', {
        email: email,
        phone_no: '',
        address: '',
        blood_group: '',
      })
      .then((res) => {
        console.log(res);
        dispatch(loginSuccessful(res.data));
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
