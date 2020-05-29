import React from 'react';
import { connect } from 'react-redux';
import { RichTextEditor } from '@ponder/ui';
import { SectionType } from '@ponder/sdk';

import { ReduxState } from '../../types/redux-store';
import * as actions from '../../actions/notebook';

type OwnProps = {
  sectionIndex: number;
  noteId: string;
  id: string;
};

type Props = OwnProps & {
  content: string;
  type: SectionType.RichText;
  updateNoteSection: typeof actions.updateNoteSection;
};

export class Section extends React.Component<Props> {
  render() {
    const { content } = this.props;
    return (
      <RichTextEditor
        initialValue={content}
        onChange={this.updateSectionContents}
      />
    );
  }

  updateSectionContents = (content: string) => {
    const { noteId, sectionIndex } = this.props;

    this.props.updateNoteSection({
      noteId,
      sectionIndex,
      content,
    });
  };
}

export const mapStateToProps = (state: ReduxState, props: OwnProps) => {
  const { type, content } = state.sections[props.id];
  return { type, content };
};

const mapDispatchToProps = {
  updateNoteSection: actions.updateNoteSection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
