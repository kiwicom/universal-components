// @flow

import * as React from 'react';
import { Text as RNText } from 'react-native';
import { StyleSheet } from '../index';
import { createStylesGenerator } from '../utils';
import {
  textAlign,
  fontSize,
  fontWeight as fontWeightTypes,
  textColor,
} from './constants';
import { shared } from './styles';

import type { TextType } from './TextTypes';

const colorGen = createStylesGenerator('color', textColor);
const fontWeightGen = createStylesGenerator('fontWeight', fontWeightTypes);
const fontSizeGen = createStylesGenerator('fontSize', fontSize);
const alingGen = createStylesGenerator('textAlign', textAlign);

const Text = ({
  children,
  italic,
  uppercase,
  dataTest,
  align = 'left',
  type = 'primary',
  weight = 'normal',
  size = 'normal',
}: TextType) => (
  <RNText
    data-test={dataTest}
    style={[
      styles.text,
      italic && styles.italic,
      uppercase && styles.uppercase,
      styles[weight],
      styles[size],
      styles[type],
      styles[align],
    ]}
  >
    {children}
  </RNText>
);

const styles = StyleSheet.create({
  text: {
    ...shared,
  },
  italic: {
    fontStyle: 'italic',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  ...fontWeightGen(),
  ...alingGen(),
  ...colorGen(),
  ...fontSizeGen(),
});

export default Text;
