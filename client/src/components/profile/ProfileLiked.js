import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import { getProfileLiked } from '../../actions/profile';
import { motion } from 'framer-motion';

const ProfileLiked = ({
  getProfileLiked,
  auth,
  profile: {
    user,
    likedposts,
    profile: { alias },
  },
  match,
}) => {
  useEffect(() => {
    getProfileLiked(alias);
  }, [getProfileLiked, alias]);
  return (
    <Fragment>
      <div className='img-grid'>
        {likedposts.map((post) => (
          <motion.div
            className='img-wrap'
            layout
            whileHover={{ opacity: 1 }}
            s
            onClick={() => console.log('clicked')}>
            <PostItem key={post._id} post={post} />
          </motion.div>
        ))}
      </div>
    </Fragment>
  );
};

ProfileLiked.propTypes = {
  getProfileLiked: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileLiked })(ProfileLiked);
