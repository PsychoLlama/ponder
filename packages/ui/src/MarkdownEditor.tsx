import { Controlled } from 'react-codemirror2';
import styled from 'styled-components';
import React from 'react';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';

export const Editor = styled(Controlled)`
  overflow-y: auto;
  display: flex;
  flex-grow: 1;

  .CodeMirror {
    height: auto;
    font-size: 16px;
    font-family: inherit;
    line-height: 20px;
    flex-grow: 1;

    // TODO: extract to a theme.
    color: #555;
  }
`;

const editorOptions = {
  lineWrapping: true,
  mode: 'markdown',
  theme: 'idea',
};

interface Props {
  initialValue: string;
  onChange: (content: string) => unknown;
}

interface State {
  value: string;
}

export default class MarkdownEditor extends React.Component<Props, State> {
  static defaultProps = {
    initialValue: '',
  };

  state = { value: this.props.initialValue };

  render() {
    return (
      <Editor
        options={editorOptions}
        value={this.state.value}
        onBeforeChange={this.updateText}
      />
    );
  }

  updateText = <Editor, Data>(_editor: Editor, _data: Data, value: string) => {
    this.setState({ value });
    this.props.onChange(value);
  };
}
