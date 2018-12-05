// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import CompactSlider from './CompactSlider';

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Playground', () => {
    const min = number('Min value', 0);
    const max = number('Max value', 100);
    const start = number('Start value', 20);
    const end = number('End value', 80);
    const snapped = boolean('Snapped', false);

    return (
      <CompactSlider
        min={min}
        max={max}
        start={start}
        end={end}
        snapped={snapped}
      />
    );
  })
  .add('Default', () => (
    <CompactSlider min={2} max={10} start={3} end={9} snapped />
  ));
