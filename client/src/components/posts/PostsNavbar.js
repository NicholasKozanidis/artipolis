import React, { Fragment, useEffect } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { latestNav, trendingNav } from '../../actions/post';

import PropTypes from 'prop-types';

const PostsNavbar = ({ latestNav, trendingNav, post: { posts } }) => {
  let history = useHistory();
  const location = useLocation();

  let category = 'nav bg-dark ';
  let active = null;

  useEffect(() => {
    if (location.search.length === 0) {
      history.push('/posts/?sort_by=latest');
    }
  }, []);

  function handleLatest(e) {
    e.preventDefault();
    latestNav();
    history.push('/posts/?sort_by=latest');
    active = 'nav bg-dark active';
  }

  function handleTrending(e) {
    e.preventDefault();
    trendingNav();
    history.push(`/posts/?sort_by=trending`);
    active = 'nav bg-dark active';
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

  return <nav>{<Fragment>{profileLinks}</Fragment>}</nav>;
};

PostsNavbar.propTypes = {
  latestNav: PropTypes.func.isRequired,
  trendingNav: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.profile,
});

export default connect(mapStateToProps, { latestNav, trendingNav })(
  withRouter(PostsNavbar)
);
