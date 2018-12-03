// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import CompactSlider from './CompactSlider';

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Default', () => <CompactSlider min={0} max={10} start={3} end={9} />);
