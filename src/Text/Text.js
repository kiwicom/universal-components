// @flow

import * as React from 'react';
import { Text as RNText, Platform } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import StyleSheet from '../PlatformStyleSheet';
import { createStylesGenerator } from '../utils';
import {
  align as alignTypes,
  fontSize,
  fontWeight as fontWeightTypes,
  textColor,
} from './styles';

import type { TextType } from './TextTypes';

const colorGen = createStylesGenerator('color', textColor);
const fontWeightGen = createStylesGenerator('fontWeight', fontWeightTypes);
const fontSizeGen = createStylesGenerator('fontSize', fontSize);
const alignGen = createStylesGenerator('textAlign', alignTypes);

const Text = ({
  align = 'left',
  children,
  dataTest,
  italic,
  numberOfLines,
  size = 'normal',
  style,
  type = 'primary',
  uppercase,
  weight = 'normal',
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
      style && style,
    ]}
    numberOfLines={numberOfLines}
  >
    {children}
  </RNText>
);
const styles = StyleSheet.create({
  text: {
    margin: 0,
    fontFamily: Platform.OS === 'web' ? defaultTokens.fontFamily : 'Roboto',
  },
  italic: {
    fontStyle: 'italic',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  ...fontWeightGen(),
  ...alignGen(),
  ...colorGen(),
  ...fontSizeGen(),
});

export default Text;
