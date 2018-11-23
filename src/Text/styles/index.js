// @flow

import { Platform } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

export const shared = {
  margin: 0,
  fontFamily: Platform.OS === 'web' ? defaultTokens.fontFamily : 'Roboto',
};
