import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <motion.div
      animate={{ opacity: [0, 0.5, 1, 1, 0.5, 0], x: 800 }}
      transition={{ ease: 'easeOut', duration: 2 }}
      key={alert.id}
      className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </motion.div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
