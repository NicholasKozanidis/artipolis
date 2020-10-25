import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  addFollow,
  removeFollow,
  setFollowToggle,
} from '../../actions/profile';

const ProfileTop = ({
  auth,
  addFollow,
  removeFollow,
  setFollowToggle,
  profile: { profile, website, social, follow },
}) => {
  useEffect(() => {
    if (auth.user !== null) {
      setFollowToggle(profile.user._id, auth.user._id);
    }
  }, [setFollowToggle]);

  return (
    <Fragment>
      <div className='profile-top bg-primary p-2'>
        <img
          className='profile-img-current'
          src={profile.user.avatar.url}
          alt=''
        />
        <br />
        <h1 className='large'>{profile.user.name}</h1>
        <h1 className='light'>{profile.status}</h1>
        <h2 className='light'>{profile.bio}</h2>
        <h3 className='light'>
          <i className='fas fa-map-marker'> </i> {profile.location}
        </h3>

        <div className='icons my-1'>
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fas fa-globe fa-2x' />
            </a>
          )}
          {social && social.twitter && (
            <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter fa-2x' />
            </a>
          )}
          {social && social.facebook && (
            <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook fa-2x' />
            </a>
          )}
          {social && social.linkedin && (
            <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-2x' />
            </a>
          )}
          {social && social.youtube && (
            <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube fa-2x' />
            </a>
          )}
          {social && social.instagram && (
            <a
              href={social.instagram}
              target='_blank'
              rel='noopener noreferrer'>
              <i className='fab fa-instagram fa-2x' />
            </a>
          )}
        </div>

        {auth.user !== null &&
        profile.user !== null &&
        auth.user._id !== profile.user._id ? (
          <Fragment>
            {(follow === false && (
              <button
                onClick={() => addFollow(profile.user._id, auth.user._id)}
                type='button'
                className='btn btn-light'>
                <i className='lni lni-brush'></i> Follow
              </button>
            )) ||
              (follow === true && (
                <button
                  onClick={() => removeFollow(profile.user._id, auth.user._id)}
                  type='button'
                  className='btn btn-dark'>
                  <i className='lni lni-brush'></i> Unfollow
                </button>
              ))}
          </Fragment>
        ) : (
          <div></div>
        )}
      </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  setFollowToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addFollow,
  setFollowToggle,
  removeFollow,
})(ProfileTop);
