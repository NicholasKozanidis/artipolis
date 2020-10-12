import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import PostsNavbar from './PostsNavbar';

import Posts from './Posts';
import { Link } from 'react-router-dom';
import { getPosts } from '../../actions/post';

const Gallery = ({ getPosts, post: { posts, searchposts, trendingposts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <Fragment>
        <SearchBar posts={posts} />
        <PostsNavbar />
      </Fragment>

      {trendingposts.length > 0 ? (
        <Posts posts={trendingposts} />
      ) : (
        (posts.length > 0 && searchposts.length === 0 && (
          <Posts posts={posts} />
        )) ||
        (posts.length > 0 && searchposts.length > 0 && (
          <Posts posts={searchposts} />
        ))
      )}
    </Fragment>
  );
};

Gallery.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Gallery);
