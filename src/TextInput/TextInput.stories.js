// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import TextInput from './index';

storiesOf('TextInput', module)
  .add('default', () => (
    <TextInput label="Label" placeholder="Type something" />
  ))
  .add('small', () => (
    <TextInput label="Label" placeholder="Type something" size="small" />
  ))
  .add('required filed', () => (
    <TextInput label="Label" placeholder="Type something" required />
  ));
