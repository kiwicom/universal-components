// @flow

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import TextInput from './index';

storiesOf('TextInput', module)
  .add('Default input', () => (
    <TextInput label="Label" value="" placeholder="Type something" />
  ))
  .add('Small input', () => (
    <TextInput
      size="small"
      label="Label"
      value=""
      placeholder="Type something"
    />
  ))
  .add('Required field', () => (
    <TextInput label="Label" value="" placeholder="Type something" required />
  ))
  .add('With text prefix', () => (
    <TextInput label="Label" value="" placeholder="Type something" prefix="$" />
  ))
  .add('Compact input', () => (
    <TextInput
      label="Label"
      inlineLabel
      value=""
      placeholder="Type something"
    />
  ));
