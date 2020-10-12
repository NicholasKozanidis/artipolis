import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { getProfileFollowers } from '../../actions/profile';

const ProfileFollowers = ({
  getProfileFollowers,
  auth,
  profile: {
    user,
    profiles,
    loading,
    profile: { alias },
  },
  match,
}) => {
  useEffect(() => {
    getProfileFollowers(alias);
  }, [getProfileFollowers, alias]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem
                  key={profile._id}
                  profile={profile}
                  alias={alias}
                />
              ))
            ) : (
              <h1>No Followers</h1>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ProfileFollowers.propTypes = {
  getProfileFollowers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileFollowers })(
  ProfileFollowers
);
