import { shallow } from 'enzyme';
import React from 'react';

import { Navigation } from '../Navigation';

describe('Navigation', () => {
  const setup = merge => {
    const props = {
      ...merge,
    };

    return {
      output: shallow(<Navigation {...props} />),
      props,
    };
  };

  it('renders', () => {
    setup();
  });
});
