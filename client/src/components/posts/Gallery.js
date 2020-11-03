import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchBar from './SearchBar';
import PostsNavbar from './PostsNavbar';
import SkeletonCrew from '../layout/SkeletonCrew';
import { useLocation } from 'react-router-dom';
import Posts from './Posts';
import {
  latestPosts,
  trendingPosts,
  getPosts,
  searchPosts,
} from '../../actions/post';

const Gallery = ({
  latestPosts,
  trendingPosts,
  getPosts,
  searchPosts,
  post: { posts, searchposts, trendingposts, latestposts },
}) => {
  const location = useLocation();

  useEffect(() => {
    getPosts();

    if (location.search.includes('?sort_by=')) {
      let sorting = location.search.split('=')[1];
      if (sorting === 'trending') trendingPosts(posts);
      if (sorting === 'latest') latestPosts(posts);
    }
    if (location.search.includes('?search=')) {
      let query = location.search.split('=')[1];
      searchPosts(query, posts);
    }
  }, [trendingPosts, latestPosts, getPosts, location]);

  return (
    <Fragment>
      <Fragment>
        <SearchBar posts={posts} />
        <PostsNavbar />
      </Fragment>

      {(trendingposts.length === 0 &&
        searchposts.length === 0 &&
        latestposts.length === 0 && <SkeletonCrew />) ||
        (trendingposts.length > 0 && <Posts posts={trendingposts} />) ||
        (searchposts.length > 0 && <Posts posts={searchposts} />) ||
        (latestposts.length > 0 && <Posts posts={latestposts} />)}
    </Fragment>
  );
};

Gallery.propTypes = {
  getPosts: PropTypes.func.isRequired,
  latestPosts: PropTypes.func.isRequired,
  trendingPosts: PropTypes.func.isRequired,
  searchPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  latestPosts,
  trendingPosts,
  searchPosts,
})(Gallery);
