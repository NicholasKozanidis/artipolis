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
      <div className='bg-primary p'>
        <h3>Change Profile Image</h3>
        <img
          className='profile-img-current'
          src={profile.user.avatar.url}
          alt=''
        />
      </div>
      <div>
        <UploadProfileImage profile={profile} />
      </div>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Workspace'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Status'
            name='status'
            value={status}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            placeholder='Bio'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
        <div className='my-2'>
          <button type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-twitter fa-2x'></i>
          <input
            type='text'
            placeholder='Twitter URL'
            name='twitter'
            value={twitter}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-facebook fa-2x'></i>
          <input
            type='text'
            placeholder='Facebook URL'
            name='facebook'
            value={facebook}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-youtube fa-2x'></i>
          <input
            type='text'
            placeholder='YouTube URL'
            name='youtube'
            value={youtube}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-group social-input'>
          <i className='fab fa-instagram fa-2x'></i>
          <input
            type='text'
            placeholder='Instagram URL'
            name='instagram'
            value={instagram}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
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
