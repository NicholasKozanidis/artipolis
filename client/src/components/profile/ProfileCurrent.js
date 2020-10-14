import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { useHistory } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileGallery from './ProfileGallery';
import ProfileNavbar from './ProfileNavbar';
import { getCurrentProfile } from '../../actions/profile';

const ProfileCurrent = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth,
}) => {
  let history = useHistory();

  useEffect(() => {
    getCurrentProfile();
    history.push(`/${auth.user.email.split('@')[0]}`);
  }, [getCurrentProfile, profile]);

  return (
    <Fragment>
      {!auth.loading && auth.isAuthenticated && profile === null ? (
        <div className='profile-top bg-primary p-2'>
          <img className='round-img my-1' src={auth.user.avatar.url} alt='' />
          <h1 className='large'>{auth.user.name}</h1>
        </div>
      ) : (
        <Fragment>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              {auth.isAuthenticated && auth.loading === false && (
                <div className='profile-grid my-1'>
                  <ProfileTop profile={profile} />

                  <ProfileGallery profile={profile} />
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileCurrent.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileCurrent);
