/* @flow */

import * as React from 'react';
import { Animated } from 'react-native';

import StyleSheet from '../PlatformStyleSheet';
import Text from '../Text';

import type { StylePropType } from '../PlatformStyleSheet/StyleTypes';

type Props = {|
  +style?: StylePropType,
  +notificationMessage: React.Node | string,
|};

export default function Alert({ style, notificationMessage }: Props) {
  return (
    <Animated.View style={[styles.container, style]}>
      <Text style={[styles.content]}>{notificationMessage}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 14,
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
});
