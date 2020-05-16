// @flow
import { renderer } from '@ponder/test-utils';

import { App } from '../App';

describe('App', () => {
  const setup = renderer(App, {
    getDefaultProps: () => ({}),
  });

  it('renders', () => {
    setup();
  });
});
