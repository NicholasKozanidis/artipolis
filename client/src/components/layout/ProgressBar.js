import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

const ProgressBar = ({ imageloading }) => {
  return (
    <Fragment>
      {imageloading !== null && (
        <motion.div
          className='progress-bar'
          initial={{ width: 10 }}
          animate={{ width: imageloading + '%' }}></motion.div>
      )}
    </Fragment>
  );
};

ProgressBar.propTypes = {
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {})(ProgressBar);
