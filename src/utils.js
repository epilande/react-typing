import React from 'react';

export const extractText = children => {
  if (Array.isArray(children) || React.isValidElement(children)) {
    return React.Children
      .map(children, child => {
        if (typeof child === 'string') {
          return child;
        }
        return extractText(child.props.children);
      })
      .join('');
  }
  return children;
};

export const composeTree = (
  children,
  charactersToType,
  characterIndex,
  typingHandler,
) => {
  if (typeof children === 'string') {
    const startWord = charactersToType.indexOf(children);
    const lineLength = startWord + children.length;
    const endWord = lineLength > characterIndex ? characterIndex : lineLength;

    if (startWord <= characterIndex) {
      return charactersToType.substring(startWord, endWord);
    }
    return null;
  }

  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return composeTree(
        child,
        charactersToType,
        characterIndex,
        typingHandler,
      );
    } else if (React.isValidElement(child)) {
      const newChildren = composeTree(
        child.props.children,
        charactersToType,
        characterIndex,
        typingHandler,
      );
      if (newChildren !== null) {
        const newProps = { ...child.props };
        if (child.type.name === 'TypingHandle') {
          newProps.typingHandler = typingHandler;
        }
        return React.cloneElement(child, newProps, newChildren);
      }
    }
    return null;
  });
};
