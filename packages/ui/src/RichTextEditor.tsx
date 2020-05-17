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
  }
`;

interface Props {
  initialValue: string;
  onChange: (content: string) => unknown;
}

export default class RichTextEditor extends React.Component<Props> {
  static defaultProps = {
    initialValue: '',
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
    this.props.onChange(content);
  });
}
