import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

const SkeletonCrew = () => {
  const skeletonPosts = Array.from({ length: 20 }, (x, index) => index + 1);
  return (
    <Fragment>
      <div className='img-grid'>
        {skeletonPosts.map((post) => (
          <Fragment key={post}>
            <motion.div
              className='img-wrap skeleton-crew'
              layout
              whileHover={{ opacity: 1 }}>
              {' '}
              <div className='skeleton-details'>
                <div className='skeleton-profile'></div>
              </div>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default SkeletonCrew;
