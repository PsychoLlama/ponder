import updateNote from '../../notes/update';
import updateSection from '../update';
import { Section } from '../../types';

jest.mock('../../notes/update');

describe('Section update', () => {
  beforeEach(() => {
    (updateNote as any).mockImplementation((_, fn) => {
      return Promise.resolve(fn({ sections: [{ section: true }] }));
    });
  });

  it('tries to update the note', async () => {
    await updateSection('note', 0, (section: Section) => {
      section.content = 'enabled';
    });

    expect(updateNote).toHaveBeenCalledWith('note', expect.any(Function));
  });

  it('calls the updater', async () => {
    const update = jest.fn();
    await updateSection('note', 0, update);

    expect(update).toHaveBeenCalledWith({ section: true });
  });
});
