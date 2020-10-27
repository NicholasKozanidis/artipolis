import React, { Fragment } from 'react';
import { useHistory, useLocation, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileNavbar = ({ auth, profile: { profile } }) => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <nav>
      <ul>
        <li>
          <Link
            className={
              location.pathname.includes(`${profile.alias}`) &&
              location.pathname.length === profile.alias.length + 1
                ? 'highlight'
                : ''
            }
            to={`/${profile.alias}`}>
            Posts
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname.includes(`${profile.alias}`) &&
              location.pathname.includes('liked')
                ? 'highlight'
                : ''
            }
            to={`/${profile.alias}/liked`}>
            Liked
            <span>
              {profile.liked.length > 0 && (
                <span>({profile.liked.length})</span>
              )}
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname.includes(`${profile.alias}`) &&
              location.pathname.includes('following')
                ? 'highlight'
                : ''
            }
            to={`/${profile.alias}/following`}>
            Following
            <span>
              {profile.following.length > 0 && (
                <span>({profile.following.length})</span>
              )}
            </span>
          </Link>
        </li>
        <li>
          <Link
            className={
              location.pathname.includes(`${profile.alias}`) &&
              location.pathname.includes('followers')
                ? 'highlight'
                : ''
            }
            to={`/${profile.alias}/followers`}>
            Followers
            <span>
              {profile.followers.length > 0 && (
                <span>({profile.followers.length})</span>
              )}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
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
