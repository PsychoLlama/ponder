// @flow
import { renderer } from '@ponder/test-utils';

import { Note } from '../Note';

describe('Note', () => {
  const setup = renderer(Note, {});

  it('renders', () => {
    expect(setup).not.toThrow();
  });
});
