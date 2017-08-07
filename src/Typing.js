import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extractText, composeTree } from './utils';

class Typing extends Component {
  constructor(props) {
    super(props);
    this.typeCharacter = this.typeCharacter.bind(this);

    this.state = {
      charactersToType: '',
      charactersTyped: [],
      characterIndex: 0,
      keyDelay: props.keyDelay || 100,
    };
  }

  componentDidMount() {
    const { children } = this.props;
    const { keyDelay } = this.state;
    const charactersToType = extractText(children);
    this.setState(() => ({ charactersToType })); // eslint-disable-line
    this.startTyping(keyDelay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyDelay !== this.state.keyDelay) {
      this.setState(() => ({ keyDelay: nextProps.keyDelay }));
      this.startTyping(nextProps.keyDelay);
    }
  }

  componentWillUnmount() {
    clearInterval(this.typeCharacterInterval);
  }

  startTyping(keyDelay) {
    clearInterval(this.typeCharacterInterval);
    this.typeCharacterInterval = setInterval(this.typeCharacter, keyDelay);
  }

  typeCharacter() {
    const { children, onDone } = this.props;
    const { charactersToType, characterIndex } = this.state;
    const composeTreeText = composeTree(
      children,
      charactersToType,
      characterIndex,
    );

    this.setState(() => ({
      charactersTyped: composeTreeText,
      characterIndex: characterIndex + 1,
    }));

    if (
      (charactersToType && charactersToType.length - 1 < characterIndex) ||
      !charactersToType
    ) {
      clearInterval(this.typeCharacterInterval);

      if (onDone) {
        onDone();
      }
    }
  }

  render() {
    const { ...restProps } = this.props;
    delete restProps.children;
    delete restProps.keyDelay;
    delete restProps.onDone;
    const { charactersTyped } = this.state;

    return (
      <span {...restProps}>
        {charactersTyped}
      </span>
    );
  }
}

Typing.defaultProps = {
  children: '',
  keyDelay: 100,
  onDone: null,
};

Typing.propTypes = {
  children: PropTypes.node,
  keyDelay: PropTypes.number,
  onDone: PropTypes.func,
};

export default Typing;
