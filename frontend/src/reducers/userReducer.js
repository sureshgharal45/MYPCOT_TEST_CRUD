import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  CREATE_RECORD_REQUEST,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_RESET,
  ALL_RECORDS_REQUEST,
  ALL_RECORDS_SUCCESS,
  ALL_RECORDS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_RECORD_REQUEST,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAIL,
  DELETE_RECORD_RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const createRecordReducer = (state = { records: {} }, action) => {
  switch (action.type) {
    case CREATE_RECORD_REQUEST:
      return {
        loading: true,
      };

    case CREATE_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.user,
        success: action.payload.success,
      };

    case CREATE_RECORD_RESET:
      return {
        ...state,
        success: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allRecordReducer = (state = { allrecords: [] }, action) => {
  switch (action.type) {
    case ALL_RECORDS_REQUEST:
      return {
        loading: true,
      };

    case ALL_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        allrecords: action.payload,
      };

    case ALL_RECORDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const singleRecordReducer = (state = { singlerecord: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        singlerecord: action.payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updateRecordReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//delete record reducer
export const deleteRecordReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_RECORD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case DELETE_RECORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_RECORD_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
