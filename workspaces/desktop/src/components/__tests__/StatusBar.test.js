// @flow
import { shallow } from 'enzyme';
import React from 'react';

import { StatusBar } from '../StatusBar';

describe('StatusBar', () => {
  const setup = merge => {
    const props = {
      ...merge,
    };

    return {
      output: shallow(<StatusBar {...props} />),
      props,
    };
  };

  it('renders', () => {
    setup();
  });

  it('renders all the children', () => {
    const Component = () => null;
    const { output } = setup({ children: <Component /> });

    expect(output.find(Component).exists()).toBe(true);
  });
});
