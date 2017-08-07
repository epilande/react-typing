import React from 'react';

export const extractText = children => {
  if (Array.isArray(children)) {
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

export const composeTree = (children, charactersToType, characterIndex) => {
  if (typeof children === 'string') {
    const startWord = charactersToType.indexOf(children);
    const lineLength = startWord + children.length;
    const endWord = lineLength > characterIndex ? characterIndex : lineLength;

    if (startWord < characterIndex) {
      return charactersToType.substring(startWord, endWord);
    }
    return null;
  }

  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return composeTree(child, charactersToType, characterIndex);
    } else if (React.isValidElement(child)) {
      return React.cloneElement(
        child,
        { ...child.props },
        composeTree(child.props.children, charactersToType, characterIndex),
      );
    }
    return null;
  });
};
