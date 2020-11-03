import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Posts = ({ posts }) => {
  return (
    <Fragment>
      <div className='img-grid'>
        {posts.map((post) => (
          <Fragment key={post._id}>
            <Link to={`/posts/${post._id}`}>
              <motion.div
                className='img-wrap'
                layout
                whileHover={{ opacity: 1 }}
                s
                onClick={() => console.log('clicked')}>
                {' '}
                <div className='post-details'>
                  <img src={post.user.avatar.url} />
                  <span> {post.user.name}</span>
                  <br />
                  {post.text}
                </div>
                <img src={post.imagepost.url} alt='' />
              </motion.div>
            </Link>
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {})(Posts);
