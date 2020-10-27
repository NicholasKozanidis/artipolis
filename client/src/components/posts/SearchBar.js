import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { searchNav } from '../../actions/post';
import { motion } from 'framer-motion';

const SearchBar = ({ searchNav, post: { searchposts } }) => {
  const [search, setSearch] = useState('');
  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes('?search=')) {
      let query = location.search.split('=')[1];
      setSearch(query);
    }
  }, [location.search]);

  const handleChange = (e) => {
    let selected = e.target.value;
    setSearch(selected);
    searchNav(selected);

    if (selected.length === 0) {
      searchNav('');
      history.push('/posts');
    }
  };

  const handleURL = () => {
    if (search.length > 0) history.push(`/posts/?search=${search}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/posts/?search=`);
  };

  const clearURL = () => {
    if (location.search.includes('?search=')) {
      let query = location.search.split('=')[1];
      if (query.length === 0) history.push('/posts');
    }
  };

  return (
    <Fragment>
      <motion.div
        className={
          location.search.includes('?search=')
            ? 'searchBox active-search'
            : 'searchBox'
        }
        onHoverEnd={handleURL}>
        <input
          className='searchInput'
          type='text'
          name='search'
          value={search}
          onChange={handleChange}
          onBlur={clearURL}
          placeholder='Search'
        />
        <button onClick={handleClick} className='searchButton' href='#'>
          <i className='fas fa-search'></i>
        </button>
        <br />
      </motion.div>
      {search.length > 0 && searchposts.length === 0 && (
        <motion.div
          animate={{
            x: [-10, 0.5, 1],
            opacity: [0, 0.8, 1],
            scale: [0.8, 1.02, 0.98, 1],
          }}
          className='noResults'>
          No Artwork found
        </motion.div>
      )}
    </Fragment>
  );
};
SearchBar.propTypes = {
  post: PropTypes.object.isRequired,
  searchNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { searchNav })(SearchBar);
