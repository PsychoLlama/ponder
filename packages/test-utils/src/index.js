/* eslint-env jest */
// @flow
import React, { type ComponentType } from 'react';
import { shallow } from 'enzyme';

type Rendered<Props> = {
  output: $Call<shallow, ComponentType<Props>>,
  props: Props,
};

type Config<Props, ConfigureState> = {
  configure?: (Rendered<Props>) => ConfigureState,
  getDefaultProps?: () => Props,
};

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
export const renderer = <
  ConfigureState: Object | void,
  Props: Object,
  Cmp: ComponentType<Props>
>(
  Component: Cmp,
  config: Config<Props, ConfigureState>
) => (mergeProps?: Props): Rendered<Props> & Object => {
  const defaultProps = config.getDefaultProps ? config.getDefaultProps() : {};
  const props = { ...defaultProps, ...mergeProps };

  expect(Component).toEqual(expect.any(Function));

  const result = {
    output: shallow(<Component {...props} />),
    props,
  };

  // `configure(...)` is a place to run a task on every setup,
  // such as setting a ref or faking instance properties.
  if (config.configure) {
    return {
      ...result,
      ...config.configure(result),
    };
  }

  return result;
};
