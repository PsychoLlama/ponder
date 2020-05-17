import { renderer } from '@ponder/test-utils';
import Quill from 'react-quill';

import RichTextEditor from '../RichTextEditor';

jest.useFakeTimers();

describe('RichTextEditor', () => {
  const setup = renderer(RichTextEditor, {
    getDefaultProps: () => ({
      initialValue: '# Title',
      onChange: jest.fn(),
    }),
  });

  it('provides a starting value', () => {
    const { output, props } = setup();

    expect(output.find(Quill).prop('defaultValue')).toBe(props.initialValue);
  });

  it('emits a change event after the user stops typing', () => {
    const { output, props } = setup();

    const value = 'new content';
    output.find(Quill).simulate('change', value);

    expect(props.onChange).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(props.onChange).toHaveBeenCalledWith(value);
  });

  it('ignores change events with the same content', () => {
    const { output, props } = setup();

    output.find(Quill).simulate('change', 'value');
    jest.runOnlyPendingTimers();
    output.find(Quill).simulate('change', 'value');
    jest.runOnlyPendingTimers();
    output.find(Quill).simulate('change', 'value');
    jest.runOnlyPendingTimers();

    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
