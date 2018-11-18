// @flow
import { renderer } from '../../utils/testing';
import { App } from '../App';

describe('App', () => {
  const setup = renderer(App, {});

  it('renders', () => {
    setup();
  });
});
