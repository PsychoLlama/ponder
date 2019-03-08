/* eslint-env jest */
// @flow
import { matchers } from 'jest-emotion';

import Adapter from 'enzyme-adapter-react-16';
import enzyme from 'enzyme';

// Adds .toHaveStyleRule(...)
expect.extend(matchers);

enzyme.configure({
  adapter: new Adapter(),
});
