import { renderer } from '@ponder/test-utils';

import RichTextEditor, { Editor } from '../RichTextEditor';

describe('RichTextEditor', () => {
  const setup = renderer(RichTextEditor, {
    getDefaultProps: () => ({
      initialValue: '# Title',
      onChange: jest.fn(),
    }),
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

  it('passes the text value every time the content changes', () => {
    const { output, props } = setup();

    const value = 'new content';
    output.find(Editor).simulate('beforeChange', null, null, value);

    expect(props.onChange).toHaveBeenCalledWith(value);
  });
});
