// @flow

import * as React from 'react';
import { shallow, render } from 'react-native-testing-library';
import { StopoverArrow } from '..';

describe('StopoverArrow', () => {
  const stops = 3;
  const { getByProps } = render(<StopoverArrow stops={stops} />);

  it('should have correct props', () => {
    expect(getByProps({ stops })).toBeDefined();
  });

  it('should match the snapshot', () => {
    const { output } = shallow(getByProps({ stops }));
    expect(output).toMatchSnapshot();
  });
});
