/* @flow */

import * as React from 'react';
import { Animated, View } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import { Icon } from '../Icon';
import Touchable from '../Button/Touchable';
import StyleSheet from '../PlatformStyleSheet';

import type { StylePropType } from '../PlatformStyleSheet/StyleTypes';
import type { NotificationStyleType } from '../types';

import Text from '../Text';

type Props = {|
  +style?: StylePropType,
  +notificationStyle: NotificationStyleType,
  +warningTitle: React.Node | string,
  +warningMessage: React.Node | string,
  +onPress: () => void,
|};

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

export default function Warning({
  style,
  onPress,
  warningTitle,
  warningMessage,
  notificationStyle,
}: Props) {
  let color;
  let iconColor;
  let iconLeft;
  let iconRight;
  let iconSize;

  switch (notificationStyle) {
    case 'error': {
      color = defaultTokens.colorTextAlertCritical;
      iconColor = defaultTokens.colorIconCritical;
      iconLeft = 'alert';
      iconRight = 'chevron-right';
      iconSize = 36;
      break;
    }
    case 'warning': {
      color = defaultTokens.colorTextAlertWarning;
      iconColor = defaultTokens.colorIconWarning;
      iconLeft = 'alert';
      iconRight = 'chevron-right';
      iconSize = 36;
      break;
    }
    case 'success': {
      color = defaultTokens.colorTextAlertSuccess;
      iconColor = defaultTokens.colorIconSuccess;
      iconLeft = 'information-circle';
      iconRight = 'close';
      iconSize = 30;
      break;
    }
    default: {
      color = defaultTokens.colorTextAlertWarning;
      iconColor = defaultTokens.colorAlertIconWarning;
      iconLeft = 'alert';
      iconRight = 'chevron-right';
      iconSize = 36;
    }
  }

  return (
    <AnimatedTouchable onPress={onPress} style={style}>
      <View style={styles.wrapper}>
        <View style={styles.leftIcon}>
          <Icon name={iconLeft} color={iconColor} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.header, { color }]}>
            {typeof warningTitle === 'string' && warningTitle.toUpperCase()}
          </Text>
          <Text style={[{ color }]}>{warningMessage}</Text>
        </View>
        <View style={styles.rightIcon}>
          <Icon name={iconRight} color={iconColor} size={iconSize} />
        </View>
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    paddingBottom: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  leftIcon: {
    paddingHorizontal: 10,
  },
  rightIcon: {
    paddingEnd: 8,
    alignSelf: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    color: 'white',
    flex: 1,
    paddingVertical: 5,
  },
});
