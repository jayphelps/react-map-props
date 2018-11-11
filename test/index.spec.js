import ShallowRenderer from 'react-test-renderer/shallow';
import expect from 'expect';
import React from 'react'
import { mapProps } from '../src';

function MyComponent(props) {
  return <div>{props.foo}</div>
}

const NullMappedComponent = mapProps({})(MyComponent)
const MappedComponent = mapProps({foo: value => value*2})(MyComponent)
const DeepMappedComponent = mapProps({foo: {bar: value => value*2}})(MyComponent)
const FnMappedComponent = mapProps(value => ({foo: value}))(MyComponent)

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
    expect(result.props.foo).toEqual(2)
  });
  
  it('changes prop when map is a deep hash', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<DeepMappedComponent foo={{bar: '1'}} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe(MyComponent);
    expect(result.props.foo).toEqual({bar: 2})
  });
  
  it('is noop when map is a deep hash and lacks the referenced key', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<DeepMappedComponent quux={{bar: '1'}} />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe(MyComponent);
    expect(result.props.foo).toBe(undefined)
    expect(result.props.quux).toEqual({bar: '1'})
  });
  
  it('changes prop when map is a function', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<FnMappedComponent bar='1' />);
    const result = renderer.getRenderOutput();

    expect(result.type).toBe(MyComponent);
    expect(result.props.foo).toEqual({bar: '1'})
  });
});
