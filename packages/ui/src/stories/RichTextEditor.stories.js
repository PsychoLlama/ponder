// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

import RichTextEditor from '../RichTextEditor';

const stories = storiesOf('RichTextEditor', module);

const initialValue = `
TODO: Fix the demo.

# Title
--------

The [markdown](#) characters aren't hidden, just _styled_.
\`<RichTextEditor>\` should work with all markdown features.

This component isn't designed for programming languages. Those
will be embedded in another, more specialized editor. Instead,
it focuses on natural human language.

It's interactive, so go ahead and try typing something here.
`
  .split('\n')
  .slice(1, -1)
  .join('\n');

stories.add('Interactive', () => {
  return <RichTextEditor initialValue={initialValue} />;
});