// @flow
import { renderer } from '@ponder/test-utils';
import { MarkdownEditor } from '@ponder/ui';

import { selector } from '../../../utils/testing';
import { Section, mapStateToProps } from '../Section';

describe('Section', () => {
  const setup = renderer(Section, {
    getDefaultProps: () => ({
      type: 'markdown',
      content: '# Title',
    }),
  });

  it('renders', () => {
    expect(setup).not.toThrow();
  });

  it('passes the initial markdown content', () => {
    const { output, props } = setup();

    const editor = output.find(MarkdownEditor);

    expect(editor.prop('initialValue')).toBe(props.content);
  });

  describe('mapStateToProps', () => {
    const select = selector(mapStateToProps, {
      defaultProps: { id: 'section-id' },
    });

    it('grabs the section type and content', () => {
      const section = { type: 'markdown', content: '# Content' };
      const { props } = select(state => {
        state.sections['section-id'] = section;
      });

      expect(props.type).toBe(section.type);
      expect(props.content).toBe(section.content);
    });
  });
});
