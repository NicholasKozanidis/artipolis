import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_FOLLOWERS,
  GET_FOLLOWING,
  FOLLOW_TOGGLE,
  SET_PROFILE_IMAGE_LOADING,
  CLEAR_IMAGE_LOADING,
  GET_LIKED,
  UPDATE_PROFILE,
  UPDATE_FOLLOW,
  FOLLOW_ERROR,
  GET_ALIAS,
  PROFILE_IMAGE_ERROR,
  ADD_PROFILE_IMAGE,
} from '../actions/types';

const initialState = {
  profile: null,
  follow: false,
  imageloading: null,
  profiles: [],
  likedposts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case GET_ALIAS:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_LIKED:
      return {
        ...state,
        likedposts: payload,
        loading: false,
      };

    case ADD_PROFILE_IMAGE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case SET_PROFILE_IMAGE_LOADING:
      return {
        ...state,
        imageloading: payload,
      };
    case CLEAR_IMAGE_LOADING:
      return {
        ...state,
        imageloading: null,
      };

    case UPDATE_FOLLOW:
      return {
        ...state,
        profiles: state.profiles.filter((profile) =>
          profile.user._id === payload.id
            ? { ...profile, followers: payload.followers }
            : profile
        ),
        profile: { ...state.profile, followers: payload.followers },
        loading: false,
        follow: !state.follow,
      };
    case FOLLOW_TOGGLE:
      return {
        ...state,
        follow: state.profile.followers.some((follower) =>
          follower._id === payload.auth_id
            ? { follow: false }
            : { follow: true }
        ),
      };

    case GET_PROFILES:
    case GET_FOLLOWERS:
    case GET_FOLLOWING:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case PROFILE_ERROR:
    case FOLLOW_ERROR:
    case PROFILE_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };

    default:
      return state;
  }
}
