// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import AlertExample from './AlertExample';

storiesOf('Alert', module)
  .addDecorator(getStory => getStory())
  .addDecorator(withKnobs)
  .add('Playground', () => {
    const type = select('Alert type', ['error', 'warning', 'success'], 'error');
    const message = text('Alert message', 'Error message');

    return <AlertExample type={type} message={message} />;
  });
