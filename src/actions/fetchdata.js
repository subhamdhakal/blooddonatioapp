import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
const queryString = require('query-string');
import {
  fetchedDonorList,
  fetchedBloodRequest,
  fetchedEventList,
  fetchedUserRequest,
  fetchedIndividualRequest,
} from '../reducers/dataReducer';

export const fetchdonorlistandbloodrequest = ({
  accessToken,
  userId,
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
  console.log(userId);

  const bloodrequestsindividual = axios.get(
    BASE_URL + 'api/v1/user-blood-request-list',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const eventlist = axios.get(BASE_URL + 'api/v1/get-event', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return (dispatch) => {
    return axios
      .all([donorlist, bloodrequests, eventlist, bloodrequestsindividual])
      .then(
        axios.spread(
          (
            donorlistresponse,
            bloodrequestresponse,
            eventlistresponse,
            bloodrequestindividualResponse,
          ) => {
            dispatch(fetchedDonorList(donorlistresponse['data']['data']));
            dispatch(fetchedBloodRequest(bloodrequestresponse['data']['data']));
            dispatch(fetchedEventList(eventlistresponse['data']));
            dispatch(
              fetchedIndividualRequest(
                bloodrequestindividualResponse['data']['data'],
              ),
            );
            console.log(
              'individual' + JSON.stringify(bloodrequestindividualResponse),
            );
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
  console.log('individual response' + user_id);
  return (dispatch) => {
    return axios
      .get(BASE_URL + 'api/v1/blood-request-list?data="59"', {
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
