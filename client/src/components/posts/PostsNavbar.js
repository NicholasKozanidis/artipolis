import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { connect } from 'react-redux';
import { latestPosts, trendingPosts } from '../../actions/post';

import PropTypes from 'prop-types';

const PostsNavbar = ({ latestPosts, trendingPosts, post: { posts } }) => {
  const dispatch = useDispatch();

  function handleLatest(e) {
    e.preventDefault();
    latestPosts();
  }

  function handleTrending(e) {
    e.preventDefault();
    trendingPosts();
  }
  const profileLinks = (
    <ul>
      <li>
        <a onClick={handleTrending} href='#'>
          Trending
        </a>
      </li>
      <li>
        <a onClick={handleLatest} href='#'>
          Latest
        </a>
      </li>
    </ul>
  );

  return (
    <nav className='nav bg-dark'>{<Fragment>{profileLinks}</Fragment>}</nav>
  );
};

PostsNavbar.propTypes = {
  latestPosts: PropTypes.func.isRequired,
  trendingPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.profile,
});

export default connect(mapStateToProps, { latestPosts, trendingPosts })(
  withRouter(PostsNavbar)
);
