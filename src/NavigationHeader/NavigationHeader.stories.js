// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import NavigationHeader from './NavigationHeader';

storiesOf('NavigationHeader', module)
  .addDecorator(withKnobs)
  .add('Playground', () => (
    <NavigationHeader
      tripType="OneWay"
      departure={{ city: 'Wroclaw', date: '2018-10-10' }}
      arrival={{ city: 'Prague', date: '2018-12-12' }}
    />
  ));
