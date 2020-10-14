import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  UPDATE_PROFILE,
  SET_PROFILE_IMAGE_LOADING,
  CLEAR_IMAGE_LOADING,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  GET_LIKED,
  GET_ALIAS,
  UPDATE_FOLLOW,
  FOLLOW_ERROR,
  ADD_PROFILE_IMAGE,
  PROFILE_IMAGE_ERROR,
} from './types';

//get current user profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get profile by alias
export const getProfileByAlias = (alias) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${alias}`);

    dispatch({
      type: GET_ALIAS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get profile by alias
export const getProfileFollowers = (alias) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${alias}/followers`);

    dispatch({
      type: GET_FOLLOWERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getProfileFollowing = (alias) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${alias}/following`);

    dispatch({
      type: GET_FOLLOWING,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const getProfileLiked = (alias) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/${alias}/liked`);

    dispatch({
      type: GET_LIKED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Profile Updated'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const addProfileImage = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('api/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progress) => {
        const { total, loaded } = progress;
        const totalSizeInMB = total / 1000000;
        const loadedSizeInMB = loaded / 1000000;
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        dispatch({
          type: SET_PROFILE_IMAGE_LOADING,
          payload: uploadPercentage,
        });
      },
    });

    dispatch({
      type: ADD_PROFILE_IMAGE,
      payload: res.data,
    });
    dispatch(setAlert('Image Uploaded', 'success'));
    dispatch({
      type: CLEAR_IMAGE_LOADING,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_IMAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addFollow = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/follow/${id}`);

    dispatch({
      type: UPDATE_FOLLOW,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeFollow = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/profile/unfollow/${id}`);

    dispatch({
      type: UPDATE_FOLLOW,
      payload: { id, followers: res.data },
    });
  } catch (err) {
    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
