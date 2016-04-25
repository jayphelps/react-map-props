import React, { Component } from 'react';
import { mapProps } from 'react-map-props';

@mapProps(
  props => ({
    ...props,
    message: `2: ${props.message} world!`
  })
)
export default
class Example2 extends Component {
  render() {
    return <div>{this.props.message}</div>;
  } 
}
