/* @flow */

import * as React from 'react';
import { Animated, View } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Icon } from '../Icon';
import Touchable from '../Button/Touchable';
import StyleSheet from '../PlatformStyleSheet';

import type { StylePropType } from '../PlatformStyleSheet/StyleTypes';
import type { OnLayout, NotificationType } from '../types';

import Text from '../Text';

type Props = {|
  +style?: StylePropType,
  +onDismiss: () => void,
|};

type State = {|
  layout: {
    height: number,
    measured: boolean,
  },
  opacity: Animated.Value,
  translateY: Animated.Value,
  isOpen: boolean,
  warningType: NotificationType,
  warningTitle: React.Node | string,
  warningMessage: React.Node | string,
|};

const ANIMATION_DURATION = 250;

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

export default class Warning extends React.Component<Props, State> {
  state = {
    layout: {
      height: -100,
      measured: false,
    },
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(0),
    isOpen: false,
    warningType: 'error',
    warningTitle: '',
    warningMessage: '',
  };

  handleLayout = (e: OnLayout) => {
    const { layout } = this.state;
    const { height } = e.nativeEvent.layout;
    const { measured } = layout;
    const { isOpen, translateY, opacity } = this.state;

    this.setState({ layout: { height, measured: true } }, () => {
      if (measured) {
        if (!isOpen) {
          // - 300 is mainly for displaying in storybook
          translateY.setValue(height - 300);
        }
      } else {
        translateY.setValue(-height - getStatusBarHeight());
        opacity.setValue(0);

        if (isOpen) {
          this.showWarning();
        }
      }
    });
  };

  toggleWarning(
    type: NotificationType,
    title: React.Node | string,
    message: React.Node | string
  ) {
    const { isOpen } = this.state;

    if (!isOpen) {
      this.setState({
        isOpen: true,
        warningType: type,
        warningTitle: title,
        warningMessage: message,
      });
      this.showWarning();
    }
  }

  showWarning = () => {
    const { opacity, translateY } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {});
  };

  hideWarning = () => {
    const { opacity, translateY, layout } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -layout.height - getStatusBarHeight(),
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({ isOpen: false });
    });
  };

  dismissWarning = () => {
    const { onDismiss } = this.props;

    this.hideWarning();
    onDismiss();
  };

  render() {
    const { style } = this.props;
    const {
      translateY,
      layout,
      opacity,
      warningType,
      warningTitle,
      warningMessage,
    } = this.state;

    let backgroundColor;
    let color;
    let iconColor;
    let iconLeft;
    let iconRight;
    let iconSize;

    switch (warningType) {
      case 'error': {
        backgroundColor = defaultTokens.backgroundAlertCritical;
        color = defaultTokens.colorTextAlertCritical;
        iconColor = defaultTokens.colorIconCritical;
        iconLeft = 'alert';
        iconRight = 'chevron-right';
        iconSize = 36;
        break;
      }
      case 'warning': {
        backgroundColor = defaultTokens.backgroundAlertWarning;
        color = defaultTokens.colorTextAlertWarning;
        iconColor = defaultTokens.colorIconWarning;
        iconLeft = 'alert';
        iconRight = 'chevron-right';
        iconSize = 36;
        break;
      }
      case 'success': {
        backgroundColor = defaultTokens.backgroundAlertSuccess;
        color = defaultTokens.colorTextAlertSuccess;
        iconColor = defaultTokens.colorIconSuccess;
        iconLeft = 'information-circle';
        iconRight = 'close';
        iconSize = 30;
        break;
      }
      default: {
        backgroundColor = defaultTokens.backgroundAlertWarning;
        color = defaultTokens.colorTextAlertWarning;
        iconColor = defaultTokens.colorAlertIconWarning;
        iconLeft = 'alert';
        iconRight = 'chevron-right';
        iconSize = 36;
      }
    }

    return (
      <Animated.View
        onLayout={this.handleLayout}
        style={[
          styles.container,
          {
            backgroundColor,
            opacity: layout.measured ? 1 : 0,
            transform: [
              {
                translateY,
              },
            ],
          },
          style,
        ]}
      >
        <AnimatedTouchable
          onPress={this.dismissWarning}
          style={[
            {
              opacity: opacity.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 0.2, 1],
              }),
            },
          ]}
        >
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
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    paddingBottom: 5,
  },
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 100,
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
