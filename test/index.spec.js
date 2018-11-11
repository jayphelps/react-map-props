import ShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import React from 'react'
import { mapProps } from '../src';

function MyComponent(props) {
  return <div>{props.foo}</div>
}

const NullMappedComponent = mapProps({})(MyComponent)
const MappedComponent = mapProps({foo: value => 4})(MyComponent)

describe('provideQueryParams', () => {
  it('does not change prop when map is empty', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<NullMappedComponent foo='1' />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe(MyComponent);
    expect(result.props.foo).toEqual(1)
  });
  
  it('changes prop when map is a hash', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<MappedComponent foo='1' />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe(MyComponent);
    expect(result.props.foo).toEqual(4)
  });
});
