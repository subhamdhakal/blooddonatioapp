import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
const queryString = require('query-string');

export const requestblood = ({accessToken, value, onSuccess, onFailure}) => {
  return (dispatch) => {
    return axios
      .post(BASE_URL + 'api/v1/blood-request', value, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('blood request response' + JSON.stringify(res['data']));
        // dispatch(fetchedUserRequest(res.data['data']));
        onSuccess(JSON.stringify(res['data']['blood_request_id']));
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        onFailure();
      });
  };
};
