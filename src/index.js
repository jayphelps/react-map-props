import React from 'react';

const applyTransform = (transform, props) => {
  if (typeof transform === 'function') {
    return transform(props);
  } else {
    const nextProps = {...props };

    for (const key in transform) {
      nextProps[key] = applyTransform(transform[key], props[key])
    }

    return nextProps;
  }
};

export const mapProps = transform => (
  ComposedComponent => (
    props => (
      <ComposedComponent {...applyTransform(transform, props)} />
    )
  )
);
