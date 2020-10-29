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

  const clearPrev = (e) => {
    e.preventDefault();
    setPreview(null);
    setImg(null);
  };

  return (
    <Fragment>
      <div className='bg-dark p'>
        <h3>Post New Artwork</h3>
      </div>

      <div className='post-form bg-dark'>
        {preview !== null && (
          <button
            button
            onClick={(e) => clearPrev(e)}
            type='button'
            className='btn btn-danger clear-prev'>
            <i className='fas fa-times'></i>
          </button>
        )}
        <div className='img-preview'>
          {preview !== null && <img src={preview} />}
        </div>{' '}
        <form
          className='post-form  my-30 '
          onSubmit={(e) => {
            e.preventDefault();
            let formData = new FormData();
            formData.append('text', text);
            formData.append('img', img);

            addPost(formData);
            setText('');
            setImg(null);
            setPreview(null);
            setTimeout(
              () =>
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                }),
              1000
            );
          }}>
          <label className='custom-file-input custom-fix-3'>
            <input onChange={handleChange} type='file' />
          </label>

          <div>{<ProgressBar imageloading={imageloading} />}</div>
          <textarea
            className='custom-text-area my-3'
            name='text'
            placeholder='Artwork Description'
            cols='30'
            rows='5'
            value={text}
            onChange={(e) => setText(e.target.value)}></textarea>
          {text !== '' && img !== null && (
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(PostForm);
