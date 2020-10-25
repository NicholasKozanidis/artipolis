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
            setImg(null);
          }}>
          {img === null && (
            <label className='custom-file-input  '>
              <input type='file' onChange={handleChange} />
            </label>
          )}
          <div className='output'>
            {imageloading && <ProgressBar imageloading={imageloading} />}
          </div>
          {img !== null && (
            <input
              type='submit'
              className='btn btn-dark custom-fix'
              value='Publish'
            />
          )}
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
