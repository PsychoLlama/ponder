import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import RichTextEditor from '../RichTextEditor';

const stories = storiesOf('RichTextEditor', module);

const initialValue = `
<h1>Rich Text Editor</h1>
<p>The editor uses <a href="https://quilljs.com" rel="noopener noreferrer" target="_blank">Quill</a> under the hood.</p>
<blockquote>Quill is an editor.</blockquote>
<blockquote>~ someone, probably</blockquote>
<p><br/></p>
<p>It supports a lot of features, but 
I haven't exposed many of them, simply because I haven't needed them yet.</p>
`
  .split('\n')
  .slice(1, -1)
  .join('\n');

stories.add('Interactive', () => {
  return (
    <RichTextEditor initialValue={initialValue} onChange={action('onChange')} />
  );
});
