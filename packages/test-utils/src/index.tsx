/* eslint-env jest */
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

// type Config<Props, ConfigureState> = {
//   configure?: (render: Rendered<Props>) => ConfigureState;
//   getDefaultProps?: () => Props;
// };

// Reduces the boilerplate for creating component test functions.
// Returns a render function that accepts props to overwrite,
// and assumes defaults were provided.
//
// Example:
// const setup = renderer(Component, {
//   getDefaultProps: () => ({
//     type: 'controlled-input',
//     id: 'default-id',
//   }),
// })
//
// const { output, props } = setup({ id: 'overridden' })
// output == <Component id="overridden" type="controlled-input" />
export const renderer = <Props, CustomTools>(
  Cmp: React.ComponentType<Props>,
  config: Config<EnzymeWrapper<Props>, Props, CustomTools>
) => {
  return (
    overrides: Partial<Props>
  ): typeof config['configure'] extends Function
    ? RenderContext<EnzymeWrapper<Props>, Props, CustomTools>
    : RenderContext<EnzymeWrapper<Props>, Props, {}> => {
    const props: Props = {
      ...config.getDefaultProps(),
      ...overrides,
    };

    const output = shallow(<Cmp {...props} />);
    const context = { output, props };

    // `configure(...)` is a place to run a task on every setup,
    // such as setting a ref or faking instance properties.
    if (config.configure) {
      const customRenderingTools: CustomTools = config.configure(context);
      return {
        ...context,
        ...customRenderingTools,
      };
    }

    return context;
  };
};

interface Config<Output, Props, CustomTools> {
  getDefaultProps: () => Props;
  configure?: (ctx: RenderContext<Output, Props, {}>) => CustomTools;
}

type RenderContext<Output, Props, CustomTools> = CustomTools & {
  output: Output;
  props: Props;
};

type EnzymeWrapper<Props> = ShallowWrapper<React.ComponentType<Props>>;
