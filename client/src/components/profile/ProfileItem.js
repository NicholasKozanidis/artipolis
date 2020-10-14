import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    alias,
    user: { _id, name, avatar },
    status,
    followers,
    following,
    location,
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
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
