// @flow
import updateNote from '../../notes/update';
import insertSection from '../insert';
import { SectionType } from '../../types';

jest.mock('../../notes/update');

describe('Section insert', () => {
  it('inserts a section at an index', async () => {
    const section = {
      type: SectionType.Markdown,
      content: 'content',
      id: 'id',
    };
    await insertSection('note', 0, section);

    expect(updateNote).toHaveBeenCalledWith('note', expect.any(Function));
  });

  it('inserts a new section', async () => {
    const createSection = <T>(merge?: T) => ({
      type: SectionType.Markdown,
      content: 'first',
      id: 'section-id',
      ...merge,
    });
    const section = createSection({ content: 'second' });
    const note = {
      sections: [createSection(), createSection({ content: 'third' })],
    };

    (updateNote as any).mockImplementation(async (_, fn) => fn(note));
    await insertSection('id', 1, section);

    expect(note.sections).toHaveLength(3);
    expect(note.sections[0].content).toBe('first');
    expect(note.sections[1].content).toBe('second');
    expect(note.sections[2].content).toBe('third');
  });
});
