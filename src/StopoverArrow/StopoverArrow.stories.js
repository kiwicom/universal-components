// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, number } from '@storybook/addon-knobs';
import { StopoverArrow } from '.';

storiesOf('StopoverArrow', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const label = 'Stops';
    const defaultValue = 0;
    const options = {
      range: true,
      min: 0,
      max: 4,
      step: 1,
    };

    const stops = number(label, defaultValue, options);
    return <StopoverArrow stops={stops} />;
  });
