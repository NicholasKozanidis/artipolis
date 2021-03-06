import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { getProfileFollowers } from '../../actions/profile';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
          <div className='img-grid'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Link key={profile._id} to={`/${profile.alias}`}>
                  <motion.div
                    className='img-wrap'
                    layout
                    whileHover={{ opacity: 1 }}
                    s
                    onClick={() => console.log('clicked')}>
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      alias={alias}
                    />
                  </motion.div>
                </Link>
              ))
            ) : (
              <h1 className='text-colored'>No followers yet</h1>
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
