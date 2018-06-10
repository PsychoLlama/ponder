import { shallow } from 'enzyme';
import React from 'react';

import { App } from '../App';

describe('App', () => {
  const setup = merge => {
    const props = {
      ...merge,
    };

    return {
      output: shallow(<App {...props} />),
      props,
    };
  };

  it('renders', () => {
    setup();
  });
});
