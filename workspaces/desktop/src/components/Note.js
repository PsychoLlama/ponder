// @flow
import { Input } from '@ponder/ui';
import React from 'react';

import { translate } from '../utils/translation';

const noop = () => {};

type Props = {};

export class Note extends React.Component<Props> {
  render() {
    return <Input placeholder={translate('Untitled Note')} onChange={noop} />;
  }
}

export default Note;
