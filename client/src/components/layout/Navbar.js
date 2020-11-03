import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentProfile } from '../../actions/profile';

const Navbar = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth,
  logout,
  history,
}) => {
  useEffect(() => {
    if (auth.isAuthenticated) getCurrentProfile();
  }, [getCurrentProfile, auth]);

  const authLinks = (
    <Fragment>
      <ul className='regular-nav'>
        <li>
          <Link to='/profiles'>Artists</Link>
        </li>
        <li>
          <i className='fas fa-cloud-upload-alt'></i>

          <Link to='/upload'>Upload</Link>
        </li>
        <li>
          <Link to='/posts'>Gallery</Link>
        </li>

        <li className='dropdown'>
          <span tabIndex='-1' className='dropdown__title' id='dropdown-title'>
            {' '}
            <i className='fas fa-user'></i>{' '}
          </span>
          <ul className='dropdown__menu' aria-labelledby='dropdown-title'>
            <li>
              <Link to='/me'>View Profile</Link>
            </li>
            <li>
              <Link to='/edit-profile'>Edit Profile</Link>
            </li>
            <li>
              <Link to='/login' onClick={() => logout(history)}>
                <i className='fas fa-sign-out-alt'></i>{' '}
                <span className='hide-sm'>Logout</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>

      <ul className='dropdown burger'>
        <span tabIndex='-1' className='dropdown__title' id='dropdown-title'>
          {' '}
          <i className='fas fa-bars'></i>
        </span>
        <ul className='dropdown__menu' aria-labelledby='dropdown-title'>
          <li>
            {' '}
            <Link to='/profiles'>Artists</Link>
          </li>
          <li>
            {' '}
            <Link to='/upload'>Upload</Link>
          </li>
          <li>
            {' '}
            <Link to='/posts'>Gallery</Link>
          </li>
          <li>
            <ul className='dropdown__menu' aria-labelledby='dropdown-title'>
              <li>
                <Link to='/me'>View Profile</Link>
              </li>
              <li>
                <Link to='/edit-profile'>Edit Profile</Link>
              </li>
              <li>
                <Link to='/login' onClick={() => logout(history)}>
                  <i className='fas fa-sign-out-alt'></i>{' '}
                  <span className='hide-sm'>Logout</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/posts'>Gallery</Link>
      </li>

      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <img
            src={
              'https://res.cloudinary.com/freakolas/image/upload/v1599327711/logo_woj58t.png'
            }
            alt=''
            className='logo-img '
          />
          <div className='text-logo'>Artipolis</div>
        </Link>
      </h1>
      {
        <Fragment>
          {auth !== null && !auth.loading && auth.isAuthenticated
            ? authLinks
            : guestLinks}
        </Fragment>
      }
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, getCurrentProfile })(
  withRouter(Navbar)
);
