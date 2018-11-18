// @flow
import styled from 'react-emotion';
import React from 'react';

export const InputNode = styled('input')`
  padding: 8px;
  border: none;
  outline: none;
  font-size: 14px;

  ::placeholder {
    padding: 0 2px;
  }
`;

type Props = {
  onChange: (input: string) => mixed,
  placeholder?: string,
  value?: string,
};

type State = {
  isEditing: boolean,
  value: string,
};

// Supports features of a controlled inputs while remaining performant.
// Keeps track of focus & blur events to know whether the user is
// actively editing the input, and only fires a change event after
// they're finished.
export class Input extends React.Component<Props, State> {
  state = { value: '', isEditing: false };

  render() {
    const { placeholder } = this.props;

    return (
      <InputNode
        value={this.getCurrentValue()}
        onFocus={this.enterEditMode}
        onChange={this.updateValue}
        onBlur={this.exitEditMode}
        placeholder={placeholder}
      />
    );
  }

  enterEditMode = () => {
    this.setState({
      value: this.getControlledValue(),
      isEditing: true,
    });
  };

  exitEditMode = () => {
    this.setState({ isEditing: false });

    const { value } = this.state;
    this.props.onChange(value);
  };

  updateValue = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ value });
  };

  // Attempt to pull the value from props,
  // but fall back to using state.
  getControlledValue = () => {
    const { value: fromProps } = this.props;
    const { value: fromState } = this.state;

    return typeof fromProps === 'string' ? fromProps : fromState;
  };

  // Only pull from props if a value was given and the
  // user isn't actively editing the input value.
  getCurrentValue = () => {
    const { value, isEditing } = this.state;

    if (isEditing) return value;
    return this.getControlledValue();
  };
}

export default Input;
