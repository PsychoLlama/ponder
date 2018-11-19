// @flow
import { renderer } from '@ponder/test-utils';

import Input, { InputNode } from '../Input';

describe('Input', () => {
  const setup = renderer(Input, {
    getDefaultProps: () => ({
      processInput: jest.fn(input => input),
      placeholder: 'Lorem Ipsum',
      value: 'Input value',
      onChange: jest.fn(),
    }),
  });

  const createInputEvent = text => ({
    target: { value: text },
  });

  it('renders', () => {
    expect(setup).not.toThrow();
  });

  it('uses the given placeholder', () => {
    const { output, props } = setup();
    const input = output.find(InputNode);

    expect(input.prop('placeholder')).toBe(props.placeholder);
  });

  it('fires the change handler on change', () => {
    const { output, props } = setup();
    const input = output.find(InputNode);

    input.simulate('focus');
    input.simulate('change', createInputEvent('data'));
    input.simulate('blur');

    expect(props.onChange).toHaveBeenCalledWith('data');
  });

  it('only fires change handlers after leaving the input', () => {
    const { output, props } = setup();
    const input = output.find(InputNode);

    input.simulate('focus');
    input.simulate('change', createInputEvent('d'));
    input.simulate('change', createInputEvent('da'));
    input.simulate('change', createInputEvent('dat'));
    input.simulate('change', createInputEvent('data'));
    input.simulate('blur');

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('data');
  });

  it('shows the given value', () => {
    const { output, props } = setup();
    const input = output.find(InputNode);

    expect(input.prop('value')).toBe(props.value);
  });

  // In this case, uncontrolled.
  it('shows input from state with no "value" prop', () => {
    const { output } = setup({ value: undefined });
    output.setState({ value: 'Edit mode state' });

    const input = output.find(InputNode);
    expect(input.prop('value')).toBe(output.state('value'));
  });

  it('guards against falsy controlled values', () => {
    const { output } = setup({ value: '' });
    output.setState({ value: 'Irrelevant' });
    const input = output.find(InputNode);

    expect(input.prop('value')).toBe('');
  });

  it('shows value from state while in edit mode', () => {
    const { output } = setup({ value: 'Prop controlled' });
    const input = output.find(InputNode);
    const value = 'Edit mode';

    input.simulate('focus');
    input.simulate('change', createInputEvent(value));

    expect(output.find(InputNode).prop('value')).toBe(value);
  });

  it('syncs with props after re-entering edit mode', () => {
    const { output, props } = setup();
    const input = output.find(InputNode);

    input.simulate('focus');
    input.simulate('change', createInputEvent(props.value + ' plus some'));
    input.simulate('blur');

    // Assertion: The state change above should
    // be discarded if props didn't update.
    input.simulate('focus');

    expect(output.find(InputNode).prop('value')).toBe(props.value);
  });

  it('ignores change events if the text remains the same', () => {
    const { output, props } = setup({ value: 'stuff' });
    const input = output.find(InputNode);

    input.simulate('focus');
    input.simulate('change', createInputEvent(props.value));
    input.simulate('blur');

    expect(props.onChange).not.toHaveBeenCalled();
  });

  it('ignores input events if the validator rejects them', () => {
    const { output, props } = setup();
    props.processInput.mockReturnValue(props.value);
    const input = output.find(InputNode);

    input.simulate('focus');
    input.simulate('change', createInputEvent(props.value + ' more stuff'));

    expect(output.state('value')).toBe(props.value);
  });

  it('survives without an input validator', () => {
    const { output } = setup({ processInput: undefined });
    const input = output.find(InputNode);
    const value = 'Content';

    input.simulate('focus');
    input.simulate('change', createInputEvent(value));
    input.simulate('blur');

    expect(output.state('value')).toBe(value);
  });
});
