/* @flow */

import * as React from 'react';
import { Animated } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import StyleSheet from '../PlatformStyleSheet';
import Alert from './Alert';
import Warning from './Warning';

import type {
  OnLayout,
  NotificationStyleType,
  NotificationType,
} from '../types';
import type { StylePropType } from '../PlatformStyleSheet/StyleTypes';

type Props = {|
  +style?: StylePropType,
  +notificationType: NotificationType,
  +onDismiss?: () => void,
|};

type State = {|
  layout: {
    height: number,
    measured: boolean,
  },
  opacity: Animated.Value,
  translateY: Animated.Value,
  isOpen: boolean,
  notificationStyle: NotificationStyleType,
  notificationTitle: React.Node | string,
  notificationMessage: React.Node | string,
|};

const ANIMATION_DURATION = 250;
const DISPLAY_DURATION = 1500;

export default class Notification extends React.Component<Props, State> {
  state = {
    layout: {
      height: -100,
      measured: false,
    },
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(0),
    isOpen: false,
    notificationStyle: 'error',
    notificationTitle: '',
    notificationMessage: '',
  };

  _lastCallTimestamp = null;
  _defferedHideAlert = undefined;
  _hideTimeout: TimeoutID;

  componentWillUnmount() {
    clearTimeout(this._hideTimeout);
  }

  _toggleNotification(
    notificationStyle: NotificationStyleType,
    title: React.Node | string,
    message: React.Node | string
  ) {
    const { isOpen } = this.state;
    const { notificationType } = this.props;
    if (!isOpen) {
      this.setState(
        {
          isOpen: true,
          notificationStyle,
          notificationTitle: title,
          notificationMessage: message,
        },
        () => this.showNotification()
      );
    } else {
      notificationType === 'alert' && this.hideNotification();
    }
  }

  handleLayout = (e: OnLayout) => {
    const { layout } = this.state;
    const { height } = e.nativeEvent.layout;
    const { measured } = layout;
    const { isOpen, translateY, opacity } = this.state;

    this.setState({ layout: { height, measured: true } }, () => {
      if (measured) {
        if (!isOpen) {
          translateY.setValue(height);
        }
      } else {
        translateY.setValue(-height - getStatusBarHeight());
        opacity.setValue(0);

        if (isOpen) {
          this.showNotification();
        }
      }
    });
  };

  toggleNotification = (
    notificationStyle: NotificationStyleType,
    title: React.Node | string,
    message: React.Node | string
  ) => {
    const { notificationType } = this.props;
    const { isOpen } = this.state;
    const now = Date.now();

    if (notificationType === 'warning') {
      this._toggleNotification(notificationStyle, title, message);
    }

    if (
      !isOpen &&
      notificationType === 'alert' &&
      (!this._lastCallTimestamp ||
        Math.abs(now - this._lastCallTimestamp) >= 200)
    ) {
      this._toggleNotification(notificationStyle, title, message);
      this._defferedHideAlert = setTimeout(
        () => this.hideNotification(),
        DISPLAY_DURATION
      );
    }

    if (
      this._lastCallTimestamp &&
      notificationType === 'alert' &&
      Math.abs(now - this._lastCallTimestamp) < 200
    ) {
      clearTimeout(this._defferedHideAlert);
      this._defferedHideAlert = setTimeout(
        () => this.hideNotification(),
        DISPLAY_DURATION
      );
    }

    this._lastCallTimestamp = now;
  };

  showNotification = () => {
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

  hideNotification = () => {
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

  dismissNotification = () => {
    const { onDismiss } = this.props;
    this.hideNotification();
    onDismiss && onDismiss();
  };

  render() {
    const { style, notificationType } = this.props;
    const {
      translateY,
      layout,
      opacity,
      notificationStyle,
      notificationMessage,
      notificationTitle,
      isOpen,
    } = this.state;

    if (!isOpen) {
      return null;
    }

    let backgroundColor;
    switch (notificationStyle) {
      case 'error': {
        backgroundColor =
          notificationType === 'alert'
            ? defaultTokens.paletteRedNormal
            : defaultTokens.backgroundAlertCritical;
        break;
      }
      case 'warning': {
        backgroundColor =
          notificationType === 'alert'
            ? defaultTokens.paletteOrangeNormal
            : defaultTokens.backgroundAlertWarning;
        break;
      }
      case 'success': {
        backgroundColor =
          notificationType === 'alert'
            ? defaultTokens.paletteGreenNormal
            : defaultTokens.backgroundAlertSuccess;
        break;
      }
      default: {
        backgroundColor =
          notificationType === 'alert'
            ? defaultTokens.paletteOrangeNormal
            : defaultTokens.backgroundAlertWarning;
      }
    }

    const opacityStyle = opacity.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0.2, 1],
    });

    return (
      <Animated.View
        onLayout={this.handleLayout}
        style={[
          styles.wrapper,
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
        {notificationType === 'alert' ? (
          <Alert
            style={{ opacity: opacityStyle }}
            notificationMessage={notificationMessage}
          />
        ) : (
          <Warning
            style={{ opacity: opacityStyle }}
            notificationStyle={notificationStyle}
            warningTitle={notificationTitle}
            warningMessage={notificationMessage}
            onPress={this.dismissNotification}
          />
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    zIndex: 100,
  },
});
