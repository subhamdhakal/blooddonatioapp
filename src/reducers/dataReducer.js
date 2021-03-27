import {
  DATA_LOADED,
  TOGGLE_DATA_STATUS,
  DATE_LOADED,
  IMAGE_URLS_LOADED,
  LOAD_PARTICULAR_WELDING_DATA,
  LOAD_PARTICULAR_ELECTRODE_DATA,
  SET_PAGE_TITLE,
  SET_YOUTUBE_VIDEO_ID,
  SET_MULTIPLE_METHODS,
  RESET_MULTIPLE_METHODS,
  RESET_ELECTRODE_ARRAY,
} from "../constants/action-types";

const initialState = {
  data: [""],
  dataStatus: false,
  errorMessage: "",
  itemData: [""],
  materialArray: [""],
  electrodeArray: [""],
  syncDate: "",
  pageTitle: "",
  youTubeVideoId: "",
  isDataAvailable: false,
  justFetched: false,
  multipleMethods: false,
  electrodeMethods: [""],
  urlOfImages: [""],
};

function dataReducer(state = initialState, action) {
  if (action.type === DATA_LOADED) {
    // console.log("data in data reducer" + action.payload);
    return {
      ...state,
      data: action.payload,
      isDataAvailable: true,
      dataStatus: true,
      justFetched: true,
    };
  }
  if (action.type === IMAGE_URLS_LOADED) {
    // console.log("data in data reducer" + action.payload);
    return {
      ...state,
      urlOfImages: action.payload,
    };
  }
  if (action.type === TOGGLE_DATA_STATUS) {
    // console.log("data in data reducer" + action.payload);
    return {
      ...state,
      dataStatus: action.payload,
      justFetched: false,
    };
  }
  if (action.type === DATE_LOADED) {
    return {
      ...state,
      syncDate: action.payload,
    };
  }
  if (action.type === LOAD_PARTICULAR_WELDING_DATA) {
    return {
      ...state,
      materialArray: action.payload["materials"],
    };
  }
  if (action.type === LOAD_PARTICULAR_ELECTRODE_DATA) {
    return {
      ...state,
      electrodeArray: action.payload,
    };
  }
  if (action.type === SET_PAGE_TITLE) {
    return {
      ...state,
      pageTitle: action.payload,
    };
  }
  if (action.type === SET_YOUTUBE_VIDEO_ID) {
    return {
      ...state,
      youTubeVideoId: action.payload,
    };
  }
  if (action.type === SET_MULTIPLE_METHODS) {
    return {
      ...state,
      multipleMethods: action.payload["hasMultipleMethods"],
      electrodeMethods: action.payload["electrodeMethods"],
    };
  }
  if (action.type === RESET_MULTIPLE_METHODS) {
    return {
      ...state,
      multipleMethods: false,
    };
  }
  if (action.type === RESET_ELECTRODE_ARRAY) {
    return {
      ...state,
      electrodeArray: [""],
    };
  }

  return state;
}

export const resetElectrodeArray = () => {
  return {
    type: RESET_ELECTRODE_ARRAY,
  };
};

export const dataAvailable = (data) => {
  return {
    type: DATA_LOADED,
    payload: data,
  };
};

export const setImageUrl = (data) => {
  return {
    type: IMAGE_URLS_LOADED,
    payload: data,
  };
};

export const loadParticularWeldingData = (particularData) => {
  return {
    type: LOAD_PARTICULAR_WELDING_DATA,
    payload: particularData,
  };
};
export const loadParticularElectrodeData = (electrodeArray) => {
  return {
    type: LOAD_PARTICULAR_ELECTRODE_DATA,
    payload: electrodeArray,
  };
};
export const setElectrodeMethodAndHasMultipleMethod = (data) => {
  return {
    type: SET_MULTIPLE_METHODS,
    payload: data,
  };
};
export const resetMultipleMethods = () => {
  return {
    type: RESET_MULTIPLE_METHODS,
    payload: false,
  };
};
export const setPageTitle = (title) => {
  return {
    type: SET_PAGE_TITLE,
    payload: title,
  };
};
export const putDate = (date) => {
  return {
    type: DATE_LOADED,
    payload: date,
  };
};

export const changeDataStatus = () => {
  return {
    type: TOGGLE_DATA_STATUS,
    payload: false,
  };
};

export const setYoutubeVideoId = (videoId) => {
  return {
    type: SET_YOUTUBE_VIDEO_ID,
    payload: videoId,
  };
};

export default dataReducer;
