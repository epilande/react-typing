<h1 align="center">React-Typing :keyboard:</h1>

<p align="center">
  <strong>Typing animation with react</strong></br>
</p>


## Why?
You want a typing animation in your application. You want it to keep the DOM
structure with nested elements and allow you to use custom components. You also want it to be easily stylable and highly configurable.

This library provides a `Typing` component that you can wrap around text or
other react components and it will animate the text inside.


## Installation
```bash
$ npm install --save react-typing
```


## Usage
```jsx
import React from 'react';
import Typing from 'react-typing';

function App() {
  return (
    <Typing>
      Hello World!
    </Typing>
  );
}
```

```jsx
// Pass html elements as children
<Typing>
  Hello <span className="abc123">World</span>!
</Typing>

<Typing>
  Hello <a href="#">World</a>!
</Typing>
```

```jsx
// Pass react components
<Typing>
  Hello World!
  <Format type="date" format="MM/DD/YYYY">
    {new Date()}
  </Format>
</Typing>
```


## `<Typing />`
The `Typing` component will animate any text in props children.

### Props

#### `keyDelay` (number)

*Default: `100`*

Sets the animation delay between each key press. This delay value is in
**milliseconds**.

#### `onDone` (function)

Function to be called when typing animation is done.

