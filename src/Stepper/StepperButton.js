// @flow srict

import * as React from 'react';
import { View } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import Icon from '../Icon';
import Touchable from '../Button/Touchable';
import StyleSheet from '../PlatformStyleSheet';
import type { StylePropType } from '../PlatformStyleSheet/StyleTypes';

type ButtonProps = {|
  +icon: React.Element<typeof Icon>,
  +touchable: boolean,
  +onPress: () => void,
  +style?: StylePropType,
|};

export default function StepperButton({
  icon,
  touchable,
  onPress,
}: ButtonProps) {
  const inner = (
    <View style={[styles.button, touchable ? null : styles.buttonDisabled]}>
      {icon}
    </View>
  );

  if (touchable) {
    return <Touchable onPress={onPress}>{inner}</Touchable>;
  }

  return inner;
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: defaultTokens.paletteCloudNormal,
  },
  buttonDisabled: {
    opacity: parseFloat(defaultTokens.opacityButtonDisabled),
  },
});
