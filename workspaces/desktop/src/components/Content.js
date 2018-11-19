// @flow
import { connect } from 'react-redux';
import styled from 'react-emotion';
import React from 'react';

import type { ReduxState } from '../types/redux-store';
import { translate } from '../utils/translation';
import * as actions from '../actions/notebooks';
import colors from '../config/colors';
import StatusBar from './StatusBar';
import Note from './Note';

const Container = styled('section')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  flex-basis: 0;
`;

const Center = styled('div')`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Title = styled('h1')`
  font-weight: 400;
  margin: 0;
  margin-bottom: 32px;
  font-size: 22px;
  color: ${colors.mutedText};
`;

const PlusIcon = styled('svg', {
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  height: 50px;
  width: 50px;
  stroke: ${colors.mutedText};
  stroke-width: 0.75;
`;

export const CreateNote = styled('button')`
  border-radius: 5px;
  border: 1px dashed ${colors.mutedText};
  padding: 16px;
  transition: background-color 100ms ease-in-out;
  outline: none;

  :hover,
  :focus {
    background-color: ${colors.hover};
  }

  :active {
    background-color: ${colors.active};
  }
`;

type Props = {
  createNote: typeof actions.createNote,
  isEditingNote: boolean,
};

export class Content extends React.Component<Props> {
  render() {
    const { isEditingNote } = this.props;

    return (
      <Container>
        {isEditingNote ? <Note /> : this.renderCreateNotePrompt()}

        <StatusBar />
      </Container>
    );
  }

  renderCreateNotePrompt() {
    const { createNote } = this.props;

    return (
      <Center>
        <Title>{translate('No Note Selected')}</Title>

        <CreateNote
          aria-label={translate('Create a Note')}
          onClick={createNote}
        >
          <PlusIcon>
            <path d="M25,0 L25,50" />
            <path d="M0,25 L50,25" />
          </PlusIcon>
        </CreateNote>
      </Center>
    );
  }
}

export const mapStateToProps = (state: ReduxState) => ({
  isEditingNote: Boolean(state.notebooks.selectedNoteId),
});

const mapDispatchToProps = {
  createNote: actions.createNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
