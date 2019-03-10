// @flow
import Adapter from 'enzyme-adapter-react-16';
import enzyme from 'enzyme';

import 'jest-styled-components';

enzyme.configure({
  adapter: new Adapter(),
});
