/* eslint-env jest */
// @flow
import produce from 'immer';

import { notebooks, navigation, notes, sections } from '../reducers/state';
import type { ReduxState } from '../types/redux-store';

const noop = () => {};

export const createReduxState = (
  update?: ImmerProducer = () => {}
): ReduxState =>
  produce(
    {
      notebooks,
      navigation,
      notes,
      sections,
    },
    update
  );

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

  return { ownProps, props, state };
};
