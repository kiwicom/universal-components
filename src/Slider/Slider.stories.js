// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import Slider from './Slider';

const noop = () => {};
storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Playground', () => {
    const min = number('Min value', 0);
    const max = number('Max value', 100000);
    const start = number('Start value', 20000);
    const end = number('End value', 80000);
    const snapped = boolean('Snapped', false);

    return (
      <Slider
        min={min}
        max={max}
        startValue={start}
        endValue={end}
        snapped={snapped}
        onChange={noop}
      />
    );
  })
  .add('Default', () => (
    <Slider min={0} max={10} startValue={2} endValue={8} onChange={noop} />
  ))
  .add('Only one marker', () => (
    <Slider min={0} max={10} startValue={2} onChange={noop} />
  ));
