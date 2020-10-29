import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <motion.div
            className='x-large'
            animate={{ color: ['#60F', '#09F', '#FA0'] }}
            transition={{ duration: 4, yoyo: Infinity }}>
            <motion.div className='logo-A'>A</motion.div>
            <motion.div className='logo-rti'>rti</motion.div>
            <motion.div className='logo-polis'>polis</motion.div>
          </motion.div>
          <p className='lead'>Join our community and share your creations</p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
