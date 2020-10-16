import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, imagepost, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <Fragment>
      <Link to={`/${user.email.split('@')[0]}`}>
        <div>
          <img className='profile-img' src={user.avatar.url} alt='' />
        </div>
        <div>
          <Link to={`/posts/${_id}`}>
            <img src={imagepost.url} alt='' />
          </Link>
          <div className='post-details my-'>
            <p>{name}</p>

            <p>{text}</p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            <button
              onClick={() => addLike(_id)}
              type='button'
              className='btn btn-light btn-round'>
              <i className='fas fa-thumbs-up' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-light btn-round'>
              <i className='fas fa-thumbs-down' />
            </button>
            <span>
              Comments{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </span>

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type='button'
                className='btn btn-danger'>
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        </div>
      </Link>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
