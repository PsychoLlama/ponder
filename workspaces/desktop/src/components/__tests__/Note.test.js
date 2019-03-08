// @flow
import { renderer } from '@ponder/test-utils';
import { Input } from '@ponder/ui';

import { Note } from '../Note';

describe('Note', () => {
  const setup = renderer(Note, {});

  it('renders', () => {
    expect(setup).not.toThrow();
  });

  it('survives onChange events', () => {
    const { output } = setup();

    output.find(Input).simulate('change', 'content');
  });
});
