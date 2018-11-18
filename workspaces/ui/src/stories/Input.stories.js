// @flow
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Input from '../Input';

const stories = storiesOf('Input', module);

stories.add('Interactive', () => {
  return (
    <Input
      placeholder={text('Placeholder', 'Placeholder Text')}
      onChange={action('onChange')}
    />
  );
});
