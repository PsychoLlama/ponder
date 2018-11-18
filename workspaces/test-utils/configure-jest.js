/* eslint-env jest */
// @flow
import { createMatchers } from 'jest-emotion';
import * as emotion from 'emotion';

import Adapter from 'enzyme-adapter-react-16';
import enzyme from 'enzyme';

// Adds .toHaveStyleRule(...)
expect.extend(createMatchers(emotion));

enzyme.configure({
  adapter: new Adapter(),
});
