import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../layout/ProgressBar';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ post: { imageloading }, addPost }) => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const types = ['image/png', 'image/jpeg'];
  const mediaStream = new MediaStream();

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setImg(selected);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImg(null);
    }
  };

  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-dark p'>
          <h3>Say Something...</h3>
          <div className='img-preview'>
            {' '}
            <img src={preview} />
          </div>
        </div>
        <form
          className='form bg-dark my-30'
          onSubmit={(e) => {
            e.preventDefault();
            let formData = new FormData();
            formData.append('text', text);
            formData.append('img', img);

            addPost(formData);
            setText('');
            setImg(null);
          }}>
          <input type='file' onChange={handleChange} />
          <span>+</span>
          <div>{<ProgressBar imageloading={imageloading} />}</div>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required=''></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(PostForm);
