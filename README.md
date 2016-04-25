react-map-props
=========================

Allows you to have a single place to transform incoming props.

## Install

```bash
npm install --save react-map-props
```

## Usage

#### As a decorator

```js
import React, { Component } from 'react';
import { mapProps } from 'react-map-props';

@mapProps({
  message: value => value + ' world'
})
export default
class Example1 extends Component {
  render() {
    // <div>hello world</div>
    return <div>{this.props.message}</div>;
  } 
}
```

#### As a function

```js
import React, { Component } from 'react';
import { mapProps } from 'react-map-props';

const Example = (props) => (
  // <div>hello world</div>
  <div>{props.message}</div>
);

export default mapProps({
  message: value => value + ' world'
})(Example);
```

## Why?

Often, components have to do some sort of consistent transformation on their props but doing it in just the `render()` method is awkward because they want to call other methods that depend on the transformed props, which means you'd need to either store it as yet another property or pass it around. This simplifies things and gives you a single place to put any of those transforms. Alternatively I've seen people do the transformations and save it as `state`, but this is awkard cause it's not really state and that requires you also handle initial props as well as `componentWillReceiveProps()`.