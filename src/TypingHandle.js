import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TypingHandle extends Component {
  componentDidMount() {
    this.props.typingHandler({ ...this.props, type: 'TypingHandle' });
  }

  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

TypingHandle.defaultProps = {};

TypingHandle.propTypes = {};

export default TypingHandle;
