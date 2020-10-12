import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProgressBar from '../layout/ProgressBar';
import { addProfileImage } from '../../actions/profile';

const UploadProfileImage = ({
  profile: { profile, imageloading },
  addProfileImage,
}) => {
  const [img, setImg] = useState(null);
  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImg(selected);
    } else {
      setImg(null);
    }
  };

  return (
    <Fragment>
      <div className='post-form'>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            let formData = new FormData();
            formData.append('img', img);
            addProfileImage(formData);
          }}>
          <input type='file' onChange={handleChange} />
          <span>+</span>
          <div className='output'>
            {img && <div>{img.name}</div>}
            {img && <ProgressBar imageloading={imageloading} />}
          </div>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

UploadProfileImage.propTypes = {
  profile: PropTypes.object.isRequired,
  addProfileImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addProfileImage })(
  UploadProfileImage
);
