import styled from 'styled-components';
import React from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import debounce from './utils/debounce';

const Container = styled.div`
  display: flex;
  flex-grow: 1;

  .quill {
    flex-grow: 1;

    .ql-editor {
      padding: 16px;
      font-size: 0.9rem;
    }
  }
`;

interface Props {
  initialValue: string;
  onChange: (content: string) => unknown;
}

interface State {
  lastKnownContent: string;
}

export default class RichTextEditor extends React.Component<Props, State> {
  static defaultProps = {
    initialValue: '',
  };

  state = {
    lastKnownContent: this.props.initialValue,
  };

  render() {
    return (
      <Container>
        <Quill
          defaultValue={this.props.initialValue}
          onChange={this.emitChangeAfterUserStopsTyping}
          theme="bubble"
        />
      </Container>
    );
  }

  emitChangeAfterUserStopsTyping = debounce(1000, (content: string) => {
    if (content === this.state.lastKnownContent) {
      return;
    }

    this.setState({ lastKnownContent: content });
    this.props.onChange(content);
  });
}
