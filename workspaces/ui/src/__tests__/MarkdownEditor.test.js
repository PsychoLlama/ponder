// @flow
import { renderer } from '@ponder/test-utils';

import MarkdownEditor, { Editor } from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  const setup = renderer(MarkdownEditor, {
    getDefaultProps: () => ({
      initialValue: '# Title',
    }),
  });

  it('renders', () => {
    expect(setup).not.toThrow();
  });

  it('syncs the value ', () => {
    const { output } = setup();

    output.find(Editor).simulate('beforeChange', null, null, 'value');

    expect(output.find(Editor).prop('value')).toBe('value');
  });

  it('uses the initial value', () => {
    const { output, props } = setup();
    const editor = output.find(Editor);

    expect(editor.prop('value')).toBe(props.initialValue);
  });
});
