// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import TextInput from './index';

storiesOf('TextInput', module)
  .add('Default input', () => (
    <TextInput label="Label" placeholder="Type something" />
  ))
  .add('Small input', () => (
    <TextInput size="small" label="Label" placeholder="Type something" />
  ))
  .add('Required field', () => (
    <TextInput label="Label" placeholder="Type something" required />
  ))
  .add('With text prefix', () => (
    <TextInput label="Label" placeholder="Type something" prefix="$" />
  ))
  .add('Compact input', () => (
    <TextInput label="Label" inlineLabel placeholder="Type something" />
  ));
