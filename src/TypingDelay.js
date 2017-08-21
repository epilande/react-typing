import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TypingDelay extends Component {
  componentDidMount() {
    this.props.typingHandler({ ...this.props, type: 'TypingDelay' });
  }

  render() {
    return this.props.children || '';
  }
}

TypingDelay.defaultProps = {};

TypingDelay.propTypes = {};

export default TypingDelay;
