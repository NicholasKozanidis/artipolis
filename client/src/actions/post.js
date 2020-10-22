import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  SET_SEARCH,
  CLEAR_SEARCH,
  SEARCH_ERROR,
  SET_TRENDING,
  SET_LATEST,
  TRENDING_ERROR,
  CLEAR_LATEST,
  CLEAR_TRENDING,
  LATEST_ERROR,
  SET_POST_IMAGE_LOADING,
  CLEAR_IMAGE_LOADING,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Search posts
export const searchNav = (search) => (dispatch) => {
  try {
    dispatch({
      type: SET_SEARCH,
      payload: search,
    });
    dispatch({
      type: CLEAR_TRENDING,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Search posts
export const searchPosts = (search, posts) => async (dispatch) => {
  try {
    if (posts.length === 0) {
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    }
    dispatch({
      type: SET_SEARCH,
      payload: search,
    });
    dispatch({
      type: CLEAR_TRENDING,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Sort most liked(trending) posts
export const trendingPosts = (posts) => async (dispatch) => {
  try {
    if (posts.length === 0) {
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    }
    dispatch({
      type: SET_TRENDING,
    });
    dispatch({
      type: CLEAR_LATEST,
    });
    dispatch({
      type: CLEAR_SEARCH,
    });
  } catch (err) {
    dispatch({
      type: TRENDING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Sort latest posts
export const latestPosts = (posts) => async (dispatch) => {
  try {
    if (posts.length === 0) {
      const res = await axios.get('/api/posts');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    }
    dispatch({
      type: SET_LATEST,
    });
    dispatch({
      type: CLEAR_TRENDING,
    });
    dispatch({
      type: CLEAR_SEARCH,
    });
  } catch (err) {
    dispatch({
      type: LATEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Sort most liked(trending) posts
export const trendingNav = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_TRENDING,
    });
    dispatch({
      type: CLEAR_LATEST,
    });
  } catch (err) {
    dispatch({
      type: TRENDING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Sort latest posts
export const latestNav = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_TRENDING,
    });
  } catch (err) {
    dispatch({
      type: LATEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progress) => {
        const { total, loaded } = progress;
        const totalSizeInMB = total / 1000000;
        const loadedSizeInMB = loaded / 1000000;
        const uploadPercentage = (loadedSizeInMB / totalSizeInMB) * 100;
        dispatch({
          type: SET_POST_IMAGE_LOADING,
          payload: uploadPercentage,
        });
      },
    });

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
    dispatch({
      type: CLEAR_IMAGE_LOADING,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
