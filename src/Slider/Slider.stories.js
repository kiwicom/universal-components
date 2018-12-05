// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import CompactSlider from './CompactSlider';

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <CompactSlider min={0} max={100000} start={60000} end={90000} />
  ));
