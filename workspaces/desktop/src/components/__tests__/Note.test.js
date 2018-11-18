// @flow
import { renderer } from '../../utils/testing';
import { Note } from '../Note';

describe('Note', () => {
  const setup = renderer(Note, {});

  it('renders', () => {
    expect(setup).not.toThrow();
  });
});
