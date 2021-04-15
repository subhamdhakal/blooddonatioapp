import {
  DONOR_LIST_FETCHED,
  BLOOD_REQUEST_FETCHED,
  EVENT_LIST_FETCHED,
  USER_MY_REQUEST_FETCHED,
} from '../constants/action-types';

const initialState = {
  donorList: [''],
  bloodRequest: [''],
  eventList: [''],
  userRequest: [''],
};

function dataReducer(state = initialState, action) {
  if (action.type === DONOR_LIST_FETCHED) {
    return {
      ...state,
      donorList: action.payload,
    };
  }
  if (action.type === BLOOD_REQUEST_FETCHED) {
    return {
      ...state,
      bloodRequest: action.payload,
    };
  }
  if (action.type === EVENT_LIST_FETCHED) {
    return {
      ...state,
      eventList: action.payload,
    };
  }
  if (action.type === USER_MY_REQUEST_FETCHED) {
    return {
      ...state,
      userRequest: action.payload,
    };
  }

  return state;
}

export const fetchedDonorList = (data) => {
  return {
    type: DONOR_LIST_FETCHED,
    payload: data,
  };
};

export const fetchedBloodRequest = (data) => {
  return {
    type: BLOOD_REQUEST_FETCHED,
    payload: data,
  };
};

export const fetchedEventList = (data) => {
  return {
    type: EVENT_LIST_FETCHED,
    payload: data,
  };
};
export const fetchedUserRequest = (data) => {
  return {
    type: USER_MY_REQUEST_FETCHED,
    payload: data,
  };
};

export default dataReducer;
