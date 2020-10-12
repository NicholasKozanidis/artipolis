import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    alias,
    user: { _id, name, avatar },
    status,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <Link to={`/${alias}`}>
        <img src={avatar.url} alt='' className='profile-img' />
        <div>
          <h2>{name}</h2>
          <p>{status}</p>
        </div>
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
