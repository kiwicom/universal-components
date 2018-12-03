// @flow

import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import Slider from './Slider';
import SliderLabels from './SliderLabels';
import CompactSlider from './CompactSlider';

import Text from '../Text';

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <View>
      <CompactSlider
        min={0}
        max={10}
        start={3}
        end={9}
        startLabel={<Text>START</Text>}
        endLabel={<Text>END</Text>}
      />
    </View>
  ));
