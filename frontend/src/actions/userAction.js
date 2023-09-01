import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  CREATE_RECORD_REQUEST,
  CREATE_RECORD_SUCCESS,
  CREATE_RECORD_FAIL,
  ALL_RECORDS_REQUEST,
  ALL_RECORDS_SUCCESS,
  ALL_RECORDS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_RECORD_REQUEST,
  DELETE_RECORD_SUCCESS,
  DELETE_RECORD_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../constants/userConstants";
import axios from "axios";

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};


//register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

//create new record
export const createRecord = (userData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_RECORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/create`, userData, config);
    dispatch({ type: CREATE_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_RECORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all the records
export const getAllRecords =
  (search = "", status = true) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_RECORDS_REQUEST });
      const { data } = await axios.get(
        `/api/v1/allrecords?search=${search}&status=${status}`
      );

      dispatch({ type: ALL_RECORDS_SUCCESS, payload: data.records });
    } catch (error) {
      dispatch({
        type: ALL_RECORDS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get single record details
export const getRecordDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/record/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.record });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

//update record
export const updateRecord = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/updaterecord/${id}`,
      userData,
      config
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete record
export const deleteRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RECORD_REQUEST });
    const { data } = await axios.delete(`/api/v1/deleterecord/${id}`);
    dispatch({ type: DELETE_RECORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_RECORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// to clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
