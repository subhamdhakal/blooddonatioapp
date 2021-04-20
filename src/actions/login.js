import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
const queryString = require('query-string');
import {loginSuccessful} from '../reducers/loginReducer';
import AsyncStorage from '@react-native-community/async-storage';

export const login = ({email, password, onSuccess, onFailure}) => {
  console.log('login pressed' + email + password);
  return (dispatch) => {
    return axios
      .post(BASE_URL + 'api/v1/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(loginSuccessful(res.data));
        console.log(res.data.user);
        try {
          AsyncStorage.setItem(
            'userdata',
            JSON.stringify(res.data.user),
            () => {
              onSuccess();
            },
          );
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        onFailure(JSON.stringify(err.response.data));
      });
  };
};
