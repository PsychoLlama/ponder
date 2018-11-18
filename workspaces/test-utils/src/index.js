/* eslint-env jest */
// @flow
import React, { type ComponentType } from 'react';
import { shallow } from 'enzyme';

// Reduces the boilerplate for creating component test functions.
// Returns a render function that accepts props to overwrite,
// and assumes defaults were provided.
//
// Example:
// const setup = renderer(Component, {
//   getDefaultProps: () => ({
//     type: 'controlled-input',
//     id: 'default-id',
//   }),
// })
//
// const { output, props } = setup({ id: 'overridden' })
// output == <Component id="overridden" type="controlled-input" />
export const renderer = <Props: Object, Cmp: ComponentType<Props>>(
  Component: Cmp,
  config: { getDefaultProps?: () => Props }
) => (mergeProps?: Props) => {
  const defaultProps = config.getDefaultProps ? config.getDefaultProps() : {};
  const props = { ...defaultProps, ...mergeProps };

  expect(Component).toEqual(expect.any(Function));

  return {
    output: shallow(<Component {...props} />),
    props,
  };
};
