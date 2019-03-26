// @flow
import updateNote from '../../notes/update';
import updateSection from '../update';

jest.mock('../../notes/update');

describe('Section update', () => {
  beforeEach(() => {
    (updateNote: Function).mockImplementation((_, fn) => {
      return Promise.resolve(fn({ sections: [{ section: true }] }));
    });
  });

  it('tries to update the note', async () => {
    await updateSection('note', 0, section => {
      section.body = 'enabled';
    });

    expect(updateNote).toHaveBeenCalledWith('note', expect.any(Function));
  });

  it('calls the updater', async () => {
    const update = jest.fn();
    await updateSection('note', 0, update);

    expect(update).toHaveBeenCalledWith({ section: true });
  });
});
