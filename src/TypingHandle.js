import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TypingHandle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,
    };
  }

  componentDidMount() {
    this.props.typingHandler({ ...this.props, type: 'TypingHandle' });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.completed && nextProps.children === this.props.children) {
      this.setState({ completed: true });
      this.props.typingHandler({
        ...this.props,
        type: 'TypingHandle',
        completed: true,
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.children !== this.props.children) {
      return true;
    }
    return false;
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}

TypingHandle.defaultProps = {
  typingHandler: () => {},
};

TypingHandle.propTypes = {
  typingHandler: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default TypingHandle;
