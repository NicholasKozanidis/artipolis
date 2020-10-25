import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { getProfiles, clearProfile } from '../../actions/profile';

const Profiles = ({
  clearProfile,
  getProfiles,
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
    clearProfile();
  }, [getProfiles, clearProfile]);
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
                    whileHover={{ opacity: 1 }}>
                    <ProfileItem key={profile._id} profile={profile} />
                  </motion.div>
                </Link>
              ))
            ) : (
              <h1>
                <Spinner />
              </h1>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, clearProfile })(
  Profiles
);
