// @flow
import updateNote from '../../notes/update';
import insertSection from '../insert';

jest.mock('../../notes/update');

describe('Section insert', () => {
  it('inserts a section at an index', async () => {
    const section = { type: 'text', body: 'content' };
    await insertSection('note', 0, section);

    expect(updateNote).toHaveBeenCalledWith('note', expect.any(Function));
  });

  it('inserts a new section', async () => {
    const createSection = merge => ({ type: 'text', body: 'first', ...merge });
    const section = createSection({ body: 'second' });
    const note = {
      sections: [createSection(), createSection({ body: 'third' })],
    };

    (updateNote: Function).mockImplementation(async (_, fn) => fn(note));
    await insertSection('id', 1, section);

    expect(note.sections).toHaveLength(3);
    expect(note.sections[0].body).toBe('first');
    expect(note.sections[1].body).toBe('second');
    expect(note.sections[2].body).toBe('third');
  });
});
