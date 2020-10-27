import React, { Fragment, useEffect } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { latestNav, trendingNav } from '../../actions/post';

import PropTypes from 'prop-types';

const PostsNavbar = ({ latestNav, trendingNav, post: { posts } }) => {
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.search.length === 0) {
      history.push('/posts/?sort_by=latest');
    }
  }, []);

  function handleLatest(e) {
    e.preventDefault();
    latestNav();
    history.push('/posts/?sort_by=latest');
  }

  function handleTrending(e) {
    e.preventDefault();
    trendingNav();
    history.push(`/posts/?sort_by=trending`);
  }

  return (
    <nav>
      {' '}
      <ul>
        <li>
          <a
            className={location.search.includes('trending') ? 'highlight' : ''}
            onClick={handleTrending}
            href='#'>
            Trending
          </a>
        </li>
        <li>
          <a
            className={location.search.includes('latest') ? 'highlight' : ''}
            onClick={handleLatest}
            href='#'>
            Latest
          </a>
        </li>
      </ul>
    </nav>
  );
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
