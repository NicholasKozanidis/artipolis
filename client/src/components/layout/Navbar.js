import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth, logout, history }) => {
  const authLinks = (
    <ul>
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
          />{' '}
          Artipolis
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
