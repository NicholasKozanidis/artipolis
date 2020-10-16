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
} from '../actions/types';

const initialState = {
  posts: [],
  searchposts: [],
  trendingposts: [],
  latestposts: [],
  imageloading: null,
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case SET_SEARCH:
      return {
        ...state,
        searchposts: state.posts.filter((post) =>
          post.text.toLowerCase().includes(payload.trim().toLowerCase())
        ),
        loading: false,
      };
    case SET_TRENDING:
      return {
        ...state,
        trendingposts: state.posts
          .slice()
          .sort((a, b) => b.likes.length - a.likes.length),
        loading: false,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchposts: [],
        loading: false,
      };
    case CLEAR_TRENDING:
      return {
        ...state,
        trendingposts: [],
        loading: false,
      };

    case SET_POST_IMAGE_LOADING:
      return {
        ...state,
        imageloading: payload,
      };
    case CLEAR_IMAGE_LOADING:
      return {
        ...state,
        imageloading: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case POST_ERROR:
    case SEARCH_ERROR:
    case TRENDING_ERROR:
    case LATEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post: { ...state.post, likes: payload.likes },
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
