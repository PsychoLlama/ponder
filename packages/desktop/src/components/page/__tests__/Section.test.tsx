import { SectionType } from '@ponder/sdk';
import { renderer } from '@ponder/test-utils';
import { MarkdownEditor } from '@ponder/ui';

import { selector } from '../../../utils/testing';
import { Section, mapStateToProps } from '../Section';

describe('Section', () => {
  const setup = renderer(Section, {
    getDefaultProps: () => ({
      type: SectionType.Markdown,
      content: '# Title',
      sectionIndex: 1,
      id: '<section-uuid>',
      noteId: '<note-id>',
      updateNoteSection: jest.fn(),
    }),
  });

  it('passes the initial markdown content', () => {
    const { output, props } = setup();

    const editor = output.find(MarkdownEditor);

    expect(editor.prop('initialValue')).toBe(props.content);
  });

  it('saves the markdown content after a time of debounce', () => {
    const { output, props } = setup();

    const content = '# Title\n-----';
    output.find(MarkdownEditor).simulate('change', content);

    expect(props.updateNoteSection).toHaveBeenCalledWith({
      noteId: props.noteId,
      sectionIndex: props.sectionIndex,
      content,
    });
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {
      defaultProps: {
        noteId: 'note-id',
        id: 'section-id',
        sectionIndex: 1,
      },
    });

    it('grabs the section type and content', () => {
      const section = { type: SectionType.Markdown, content: '# Content' };
      const { props } = select((state) => {
        state.sections['section-id'] = section;
      });

      expect(props.type).toBe(section.type);
      expect(props.content).toBe(section.content);
    });
  });
});
