import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='img-grid'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Link to={`/${profile.alias}`}>
                  <motion.div
                    className='img-wrap'
                    layout
                    whileHover={{ opacity: 1 }}
                    s
                    animate={{
                      borderRadius: 30,
                      boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.7)',
                    }}>
                    <ProfileItem key={profile._id} profile={profile} />
                  </motion.div>
                </Link>
              ))
            ) : (
              <h1>No profiles found</h1>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
