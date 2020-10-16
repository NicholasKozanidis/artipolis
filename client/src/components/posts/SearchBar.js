import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchPosts, clearSearch } from '../../actions/post';
import { motion } from 'framer-motion';

const SearchBar = ({ clearSearch, searchPosts, post: { searchposts } }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    let selected = e.target.value;
    setSearch(selected);
    searchPosts(search);
    if (selected.length === 0) {
      searchPosts('');
    }
  };

  return (
    <Fragment>
      <motion.div className='searchBox'>
        <input
          className='searchInput'
          type='text'
          name='search'
          value={search}
          onChange={handleChange}
          placeholder='Search'
        />
        <div className='searchButton' href='#'>
          <i className='fas fa-search'></i>
        </div>
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
  searchPosts: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { searchPosts, clearSearch })(
  SearchBar
);
