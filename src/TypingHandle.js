import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TypingHandle extends Component {
  componentDidMount() {
    this.props.typingHandler({ ...this.props, type: 'TypingHandle' });
  }

  render() {
    return this.props.children || '';
  }
}

TypingHandle.defaultProps = {};

TypingHandle.propTypes = {};

export default TypingHandle;

