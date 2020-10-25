import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    alias,
    user: { _id, name, avatar },
    status,
    followers,
    location,
    following,
    skills,
  },
}) => {
  return (
    <div className='profile'>
      <img src={avatar.url} alt='' className='profile-img' />
      <div className='post-details'>
        <span> {name}</span>
        <br />
        {status}
        <br />
        {location && (
          <div>
            {' '}
            <i className='fas fa-map-marker'> </i> {location}
          </div>
        )}
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
