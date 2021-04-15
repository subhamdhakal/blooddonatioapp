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
  console.log(user_id);
  return (dispatch) => {
    return axios
      .get(BASE_URL + 'api/v1/blood-request-list?user_id=' + user_id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        dispatch(fetchedUserRequest(res.data['data']));
        console.log('User request' + JSON.stringify(res));
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFailure();
      });
  };
};

export const deleteBloodRequest = ({
  accessToken,
  deleteRequestBody,
  onSuccess,
  onFailure,
}) => {
  //   {
  //     "request_id": "5",
  //     "user_id": "47"
  // }
  return (dispatch) => {
    return axios
      .post(BASE_URL + 'api/v1/blood-request-del', deleteRequestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);

        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFailure();
      });
  };
};

export const completeBloodRequest = ({
  accessToken,
  completeRequestBody,
  onSuccess,
  onFailure,
}) => {
  return (dispatch) => {
    //     {
    //     "request_id": "2",
    //     "user_id": "45"
    // }
    return axios
      .post(BASE_URL + 'api/v1/complete-request', completeRequestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);

        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFailure();
      });
  };
};

export const acceptBloodRequest = ({
  accessToken,
  acceptBloodRequestBody,
  onSuccess,
  onFailure,
}) => {
  //   {
  //     "request_id": "2",
  //     "user_id": "45"
  // }

  return (dispatch) => {
    //     {
    //     "request_id": "2",
    //     "user_id": "45"
    // }
    return axios
      .get(BASE_URL + 'api/v1/accept-request', acceptBloodRequestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // dispatch(fetchedUserRequest(res.data['data']));
        console.log(res);

        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        onFailure();
      });
  };
};
