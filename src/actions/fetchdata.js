import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
const queryString = require('query-string');
import {
  fetchedDonorList,
  fetchedBloodRequest,
  fetchedEventList,
  fetchedUserRequest,
} from '../reducers/dataReducer';

export const fetchdonorlistandbloodrequest = ({
  accessToken,
  onSuccess,
  onFailure,
}) => {
  const donorlist = axios.get(BASE_URL + 'api/v1/allusers?data=donor', {
    headers: {Authorization: `Bearer ${accessToken}`},
  });

  const bloodrequests = axios.get(BASE_URL + 'api/v1/blood-request-list', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const eventlist = axios.get(BASE_URL + 'api/v1/get-event', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (dispatch) => {
    return axios
      .all([donorlist, bloodrequests, eventlist])
      .then(
        axios.spread(
          (donorlistresponse, bloodrequestresponse, eventlistresponse) => {
            console.log(
              'donorlist' + JSON.stringify(donorlistresponse['data']['data']),
            );
            console.log(
              'bloodrequest' +
                JSON.stringify(bloodrequestresponse['data']['data']),
            );
            dispatch(fetchedDonorList(donorlistresponse['data']['data']));
            dispatch(fetchedBloodRequest(bloodrequestresponse['data']['data']));
            dispatch(fetchedEventList(eventlistresponse['data']));

            onSuccess();
          },
        ),
      )

      .catch((err) => {
        console.log(err);
        dispatch(dataFetchFailed(false));
        onFailure();
      });
  };
};

export const fetcheduserrequestlist = ({
  accessToken,
  user_id,
  onSuccess,
  onFailure,
}) => {
  return (dispatch) => {
    return axios
      .get(BASE_URL + 'api/v1/blood-request-list?user_id=' + user_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('individual' + JSON.stringify(res['data']['data']));
        dispatch(fetchedUserRequest(res.data['data']));
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFailure();
      });
  };
};
