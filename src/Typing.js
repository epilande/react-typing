import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extractText, composeTree } from './utils';

class Typing extends Component {
  constructor(props) {
    super(props);
    this.typeCharacter = this.typeCharacter.bind(this);
    this.typingHandler = this.typingHandler.bind(this);

    this.state = {
      charactersToType: '',
      charactersTyped: [],
      characterIndex: 0,
      keyDelay: props.keyDelay,
    };
  }

  componentDidMount() {
    const { children, delay } = this.props;
    const charactersToType = extractText(children);
    this.setState(() => ({ charactersToType })); // eslint-disable-line

    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      this.startTyping();
    }, delay);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyDelay !== this.state.keyDelay) {
      this.setState(() => ({ keyDelay: nextProps.keyDelay }));
      this.startTyping(nextProps.keyDelay);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
    clearInterval(this.typeCharacterInterval);
  }

  startTyping(keyDelay) {
    const speed = keyDelay || this.state.keyDelay;
    clearInterval(this.typeCharacterInterval);
    this.typeCharacterInterval = setInterval(this.typeCharacter, speed);
  }

  typeCharacter() {
    const { children, onDone } = this.props;
    const { charactersToType, characterIndex } = this.state;
    const composeTreeText = composeTree(
      children,
      charactersToType,
      characterIndex,
      this.typingHandler,
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

  typingHandler(childProps) {
    clearInterval(this.typeCharacterInterval);

    setTimeout(() => {
      if (childProps.complete) {
        const childLength = childProps.childToType.length;
        return this.setState(
          state => ({
            characterIndex: state.characterIndex + childLength - 1,
          }),
          this.startTyping(),
        );
      }

      return this.startTyping();
    }, childProps.delay || 0);
  }

  render() {
    const { ...restProps } = this.props;
    delete restProps.children;
    delete restProps.delay;
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
  delay: 0,
  keyDelay: 100,
  onDone: null,
};

Typing.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  keyDelay: PropTypes.number,
  onDone: PropTypes.func,
};

export default Typing;
