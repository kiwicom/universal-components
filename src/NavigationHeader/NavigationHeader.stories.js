// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, select } from '@storybook/addon-knobs';

import NavigationHeader from './NavigationHeader';

storiesOf('NavigationHeader', module)
  .addDecorator(withKnobs)
  .add('Playground', () => {
    const tripType = select(
      'Trip Type',
      ['OneWay', 'MultiCity', 'Return'],
      'MultiCity'
    );

    return (
      <NavigationHeader
        tripType={tripType}
        departure={{ city: 'Wroclaw', date: '2018-10-10' }}
        arrival={{ city: 'Prague', date: '2018-12-12' }}
      />
    );
  });
