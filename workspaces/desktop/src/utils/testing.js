/* eslint-env jest */
// @flow
import React, { type ComponentType } from 'react';
import { shallow } from 'enzyme';
import produce from 'immer';

import { initialState as notebooks } from '../reducers/notebooks';
import type { ReduxState } from '../types/redux-store';

const noop = () => {};

export const createReduxState = (): ReduxState => ({
  notebooks,
});

// Reduces the boilerplate for creating component test functions.
// Returns a render function that accepts props to overwrite,
// and assumes defaults were provided.
//
// Example:
// const setup = renderer(Component, {
//   defaultProps: {
//     type: 'controlled-input',
//     id: 'default-id',
//   },
// })
//
// const { output, props } = setup({ id: 'overridden' })
// output == <Component id="overridden" type="controlled-input" />
export const renderer = <Props: Object, Cmp: ComponentType<Props>>(
  Component: Cmp,
  config: { defaultProps?: Props }
) => (mergeProps?: Props) => {
  const props = {
    ...config.defaultProps,
    ...mergeProps,
  };

  expect(Component).toEqual(expect.any(Function));

  return {
    output: shallow(<Component {...props} />),
    props,
  };
};

type ImmerProducer = (state: ReduxState) => void;

// Similar to `renderer(...)`, but instead of simplifying component
// testing, this focuses on mapStateToProps. It automatically
// creates a mock redux state, provides default component props,
// and validates the return value.
//
// Example:
// const select = selector(mapStateToProps, {
//   defaultProps: { id: 10 },
// })
//
// const { props, state } = select()
export const selector = <OwnProps: Object, Selection: Object>(
  mapStateToProps: (ReduxState, props?: OwnProps) => Selection,
  config: { defaultProps?: OwnProps }
) => (producer: ImmerProducer = noop, mergeProps?: OwnProps) => {
  const defaultState = createReduxState();
  const state = produce(defaultState, producer);

  const ownProps = { ...config.defaultProps, ...mergeProps };
  const props = mapStateToProps(state, ownProps);

  expect(props).toEqual(expect.any(Object));

  return { props, state };
};
