// @flow
import React from 'react';

import { renderer } from '../../utils/testing';
import { StatusBar } from '../StatusBar';

describe('StatusBar', () => {
  const setup = renderer(StatusBar, {});

  it('renders', () => {
    setup();
  });

  it('renders all the children', () => {
    const Component = () => null;
    const { output } = setup({ children: <Component /> });

    expect(output.find(Component).exists()).toBe(true);
  });
});
