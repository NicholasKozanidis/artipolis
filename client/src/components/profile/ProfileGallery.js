import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import { getPosts } from '../../actions/post';
import { motion } from 'framer-motion';

const ProfileGallery = ({ auth, profile, getPosts, post: { posts, user } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <div className='img-grid'>
        {posts
          .filter((post) => post.user._id === profile.profile.user._id)
          .map((filteredPost) => (
            <motion.div
              className='img-wrap'
              layout
              whileHover={{ opacity: 1 }}
              s
              onClick={() => console.log('clicked')}>
              <PostItem key={filteredPost._id} post={filteredPost} />
            </motion.div>
          ))}
      </div>
    </Fragment>
  );
};

ProfileGallery.propTypes = {
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts })(ProfileGallery);
