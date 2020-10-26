import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  SET_POST_IMAGE_LOADING,
  CLEAR_IMAGE_LOADING,
  SET_SEARCH,
  SEARCH_ERROR,
  SET_TRENDING,
  TRENDING_ERROR,
  LATEST_ERROR,
  CLEAR_TRENDING,
  CLEAR_SEARCH,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  SET_LATEST,
} from '../../actions/types';

import post from '../../reducers/post.js';
import profile from '../../reducers/profile.js';

describe('posts reducer test', () => {
  let initialState = {
    error: {},
    imageloading: null,
    latestposts: [],
    loading: true,
    post: null,
    posts: [],
    searchposts: [],
    trendingposts: [],
  };

  it('should return initial post state', () => {
    expect(post(undefined, {})).toEqual(initialState);
  });
});

describe('profile reducer test', () => {
  it('should return initial profile state', () => {
    expect(profile(undefined, {})).toEqual({
      profile: null,
      follow: null,
      imageloading: null,
      profiles: [],
      likedposts: [],
      loading: true,
      error: {},
    });
  });
});
