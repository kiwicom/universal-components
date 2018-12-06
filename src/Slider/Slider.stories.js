// @flow

import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import Slider from './Slider';

const noop = () => {};
storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <View>
      <Slider
        min={0}
        max={100000}
        startValue={5266}
        endValue={19289}
        onChange={noop}
      />
    </View>
  ))
  .add('Playground', () => {
    const min = number('Min value', 0);
    const max = number('Max value', 100000);
    const start = number('Start value', 20000);
    const end = number('End value', 80000);
    const snapped = boolean('Snapped', false);

    return (
      <View>
        <Slider
          min={min}
          max={max}
          startValue={start}
          endValue={end}
          snapped={snapped}
          onChange={noop}
        />
      </View>
    );
  })

  .add('Only one marker', () => (
    <View>
      <Slider min={0} max={10} startValue={2} onChange={noop} />
    </View>
  ));
