import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileGallery from './ProfileGallery';
import ProfileLiked from './ProfileLiked';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowing from './ProfileFollowing';
import ProfileNavbar from './ProfileNavbar';
import { getProfileByAlias } from '../../actions/profile';

const ProfileAlias = ({
  getProfileByAlias,
  profile: { profile, loading },
  match,
  location,
  auth,
}) => {
  useEffect(() => {
    getProfileByAlias(match.params.alias);
  }, [getProfileByAlias, match.params.alias]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Fragment>
            <div className='profile-grid my-1'>
              <ProfileTop profile={profile} />
            </div>
          </Fragment>
          <Fragment>
            <ProfileNavbar profile={profile} />
            <div className=' my-1'>
              {location.pathname === `/${profile.alias}` && (
                <ProfileGallery profile={profile} />
              )}
              {location.pathname === `/${profile.alias}/liked` && (
                <ProfileLiked profile={profile} />
              )}
              {location.pathname === `/${profile.alias}/following` && (
                <ProfileFollowing profile={profile} />
              )}
              {location.pathname === `/${profile.alias}/followers` && (
                <ProfileFollowers profile={profile} />
              )}
            </div>
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileAlias.propTypes = {
  getProfileByAlias: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByAlias })(ProfileAlias);
