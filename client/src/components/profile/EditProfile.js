import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadProfileImage from './UploadProfileImage';
import { editProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const EditProfile = ({
  auth,
  profile: { profile, loading },
  editProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(formData, history);
  };
  return (
    <Fragment>
      <div className='profile-top bg-primary p-2'>
        <div>
          <h3>Change Profile Image</h3>
          <img
            className='profile-img-current'
            src={profile.user.avatar.url}
            alt=''
          />
        </div>
      </div>
      <div>
        <UploadProfileImage profile={profile} />
      </div>
      <h1 className='large text-colored'>Edit Your Profile</h1>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <label className='edit-prof-label'>Web</label>

          <input
            className='custom-text-area'
            type='text'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='edit-prof-label'>Location</label>

          <input
            className='custom-text-area'
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='edit-prof-label'>Employment status</label>

          <input
            className='custom-text-area'
            type='text'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='edit-prof-label'>Software skills</label>

          <input
            className='custom-text-area'
            type='text'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label className='edit-prof-label'>A few words about yourself</label>

          <textarea
            className='custom-text-area'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}></textarea>
        </div>
        <div className='edit-prof-label my-2'>You are also on:</div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input
            className='custom-text-area'
            type='text'
            name='twitter'
            value={twitter}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input
            className='custom-text-area'
            type='text'
            name='facebook'
            value={facebook}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input
            className='custom-text-area'
            type='text'
            name='youtube'
            value={youtube}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input
            className='custom-text-area'
            type='text'
            name='instagram'
            value={instagram}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary ' value='Save' />
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
