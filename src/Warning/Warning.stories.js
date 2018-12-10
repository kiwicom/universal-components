// @flow

import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import WarningExample from './WarningExample';

storiesOf('Warning', module)
  .addDecorator(getStory => getStory())
  .addDecorator(withKnobs)
  .add('Playground', () => {
    const type = select(
      'Warning type',
      ['error', 'warning', 'success'],
      'error'
    );
    const title = text('Warning title', 'Something went wrong!');
    const message = text(
      'Warning message',
      'Thus your preferences could not be saved.'
    );

    return <WarningExample type={type} message={message} title={title} />;
  });
