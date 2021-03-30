import {BASE_URL} from './../constants/app-constants';
import axios from 'react-native-axios';
const queryString = require('query-string');
import {fetchedDonorList, fetchedBloodRequest} from '../reducers/dataReducer';

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

  return (dispatch) => {
    return axios
      .all([donorlist, bloodrequests])
      .then(
        axios.spread((donorlistresponse, bloodrequestresponse) => {
          console.log('donorlist' + JSON.stringify(donorlistresponse['data']));
          console.log(
            'bloodrequest' + JSON.stringify(bloodrequestresponse['data']),
          );
          dispatch(fetchedDonorList(donorlistresponse['data']));
          dispatch(fetchedBloodRequest(bloodrequestresponse['data']));
          onSuccess();
        }),
      )

      .catch((err) => {
        console.log(err);
        dispatch(dataFetchFailed(false));
        onFailure();
      });
  };
};
