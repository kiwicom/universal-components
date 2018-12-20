// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { ConnectionCard } from './index';

storiesOf('ConnectionCard', module)
  .addDecorator(withKnobs)
  .add('Playground', () => {
    const hasReturnConnection = boolean('Has return connection', true);
    const hasBadges = boolean('Has badges', true);
    const currency = select('Currency', ['CZK', 'EUR', 'USD', 'GBP'], 'CZK');
    const locale = select(
      'Locale',
      ['cs-CZ', 'de-DE', 'fr-FR', 'en-GB', 'en-US'],
      'cs-CZ'
    );
    return (
      <ConnectionCard
        wayForth={[
          {
            id: 1,
            arrival: 'Berlin TXL',
            arrivalTime: '14:20',
            carrier: { code: 'OK', name: 'Czech Airlines' },
            tripDate: 'Mon 22 Oct',
            departure: 'Prague PRG',
            departureTime: '13:20',
            duration: '1h',
          },
          {
            id: 2,
            arrival: 'Moscow VKO',
            arrivalTime: '20:20',
            carrier: { code: 'FR', type: 'airline', name: 'Ryanair' },
            tripDate: 'Mon 22 Oct',
            departure: 'Berlin TXL',
            departureTime: '15:20',
            duration: '3h',
          },
        ]}
        wayBack={
          hasReturnConnection && [
            {
              id: 1,
              arrival: 'Prague PRG',
              arrivalTime: '14:00',
              carrier: { code: 'TO', name: 'Transavia France' },
              tripDate: 'Mon 25 Oct',
              departure: 'Moscow VKO',
              departureTime: '10:00',
              duration: '4h',
            },
          ]
        }
        duration={hasReturnConnection && '3 days'}
        price={{
          value: 123455.3455,
          currency,
          locale,
        }}
        badges={
          hasBadges && [
            {
              id: 1,
              type: 'warning',
              children: 'Cheapest',
            },
            {
              id: 2,
              type: 'neutral',
              children: 'Wi-fi',
            },
          ]
        }
      />
    );
  });
