// @flow
import React from 'react';
import { connect } from 'react-redux';
import { MarkdownEditor } from '@ponder/ui';

import type { ReduxState } from '../../types/redux-store';

type OwnProps = {
  id: string,
};

type Props = OwnProps & {
  content: string,
  type: 'markdown',
};

export class Section extends React.Component<Props> {
  render() {
    const { content } = this.props;
    return <MarkdownEditor initialValue={content} />;
  }
}

export const mapStateToProps = (state: ReduxState, props: OwnProps) => {
  const { type, content } = state.sections[props.id];
  return { type, content };
};

export default connect(mapStateToProps)(Section);
