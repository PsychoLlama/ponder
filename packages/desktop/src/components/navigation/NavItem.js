// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import type { ReduxState } from '../../types/redux-store';
import colors from '../../config/colors';
import { translate } from '../../utils/translation';
import * as actions from '../../actions/notebook';

const Link = styled.a.attrs({ href: '#' })`
  padding: 8px 24px;
  display: block;
  transition-property: padding-left, padding-right;
  transition-duration: 250ms;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  color: inherit;
  text-decoration: none;
  cursor: default;
  user-select: none;

  :hover {
    padding-left: 32px;
    padding-right: 16px;
  }
`;

export const Notebook = styled(Link)`
  font-size: 16px;
`;

export const Note = styled(Link)`
  color: ${(props) => (props.selected ? colors.primary : colors.mutedText)};
`;

type OwnProps = {
  id: string,
  type: 'note' | 'notebook',
};

type Props = OwnProps & {
  title: string,
  selected: boolean,
  editNote: typeof actions.editNote,
};

export class NavItem extends React.Component<Props> {
  render() {
    const { type, title, selected } = this.props;
    const Item = type === 'note' ? Note : Notebook;

    const defaultTitle =
      type === 'note'
        ? translate('Untitled Note')
        : translate('Untitled Notebook');

    return (
      <Item onClick={this.editNote} selected={selected}>
        {title || defaultTitle}
      </Item>
    );
  }

  editNote = () => {
    const { id, selected } = this.props;

    if (!selected) {
      this.props.editNote(id);
    }
  };
}

export const mapStateToProps = (
  { navigation, notes, notebooks }: ReduxState,
  { id, type }: OwnProps
) => {
  const collection = type === 'note' ? notes : notebooks;
  const { title } = collection[id];

  return {
    selected: navigation.note === id,
    title,
  };
};

const mapDispatchToProps = {
  editNote: actions.editNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
