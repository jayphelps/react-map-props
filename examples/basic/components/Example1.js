import React, { Component } from 'react';
import { mapProps } from 'react-map-props';

@mapProps({
  message: value => `1: ${value} world!`
})
export default
class Example1 extends Component {
  render() {
    return <div>{this.props.message}</div>;
  } 
}
