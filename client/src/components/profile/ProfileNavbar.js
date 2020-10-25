import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileNavbar = ({ auth, profile: { profile } }) => {
  const profileLinks = (
    <ul>
      <li>
        <Link to={`/${profile.alias}`}>Posts</Link>
      </li>
      <li>
        <Link to={`/${profile.alias}/liked`}>
          Liked
          <span>
            {profile.liked.length > 0 && <span>({profile.liked.length})</span>}
          </span>
        </Link>
      </li>
      <li>
        <Link to={`/${profile.alias}/following`}>
          Following
          <span>
            {profile.following.length > 0 && (
              <span>({profile.following.length})</span>
            )}
          </span>
        </Link>
      </li>
      <li>
        <Link to={`/${profile.alias}/followers`}>
          Followers
          <span>
            {profile.followers.length > 0 && (
              <span>({profile.followers.length})</span>
            )}
          </span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='nav  bg-dark'>{<Fragment>{profileLinks}</Fragment>}</nav>
  );
};

ProfileNavbar.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {})(withRouter(ProfileNavbar));
