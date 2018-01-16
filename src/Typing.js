import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { extractText, composeTree } from './utils';

class Typing extends Component {
  constructor(props) {
    super(props);
    this.typeCharacter = this.typeCharacter.bind(this);
    this.typingHandler = this.typingHandler.bind(this);
    this.resetSpeed = this.resetSpeed.bind(this);

    this.state = {
      charactersToType: '',
      charactersTyped: [],
      characterIndex: 0,
      speed: props.speed,
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
    if (nextProps.speed !== this.state.speed) {
      this.setState(() => ({ speed: nextProps.speed }), this.startTyping);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayTimer);
    clearInterval(this.typeCharacterInterval);
  }

  startTyping() {
    clearInterval(this.typeCharacterInterval);
    this.typeCharacterInterval = setInterval(
      this.typeCharacter,
      this.state.speed,
    );
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

  resetSpeed() {
    return this.setState(() => ({ speed: this.props.speed }), this.startTyping);
  }

  typingHandler(childProps) {
    clearInterval(this.typeCharacterInterval);

    if (childProps.completed) {
      return this.resetSpeed();
    }

    return setTimeout(() => {
      if (childProps.speed) {
        return this.setState(
          () => ({ speed: childProps.speed }),
          this.startTyping,
        );
      }

      return this.startTyping();
    }, childProps.delay || 0);
  }

  render() {
    const { ...restProps } = this.props;
    delete restProps.children;
    delete restProps.delay;
    delete restProps.speed;
    delete restProps.onDone;
    const { charactersTyped } = this.state;

    return <span {...restProps}>{charactersTyped}</span>;
  }
}

Typing.defaultProps = {
  children: '',
  delay: 0,
  speed: 100,
  onDone: null,
};

Typing.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  speed: PropTypes.number,
  onDone: PropTypes.func,
};

export default Typing;
