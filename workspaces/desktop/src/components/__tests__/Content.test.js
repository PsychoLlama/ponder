import { shallow } from 'enzyme';
import React from 'react';

import { Content } from '../Content';

describe('Content', () => {
  const setup = merge => {
    const props = {
      ...merge,
    };

    return {
      output: shallow(<Content {...props} />),
      props,
    };
  };

  it('renders', () => {
    setup();
  });
});
