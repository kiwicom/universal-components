/* @flow */

import * as React from 'react';
import { Animated } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import StyleSheet from '../PlatformStyleSheet';
import type { StylePropType } from '../PlatformStyleSheet/StyleTypes';

import Text from '../Text';

type Props = {|
  +style?: StylePropType,
|};

type State = {|
  layout: {
    height: number,
    measured: boolean,
  },
  opacity: Animated.Value,
  translateY: Animated.Value,
  isOpen: boolean,
  alertType: AlertType,
  alertMessage: React.Node | string,
|};

type OnLayout = {
  +nativeEvent: {
    +layout: {
      +x: number,
      +y: number,
      +width: number,
      +height: number,
    },
  },
};

type AlertType = 'error' | 'warning' | 'success';

const ANIMATION_DURATION = 250;
const DISPLAY_DURATION = 1500;

export default class Alert extends React.Component<Props, State> {
  state = {
    layout: {
      height: -100,
      measured: false,
    },
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(0),
    isOpen: false,
    alertType: 'error',
    alertMessage: '',
  };

  componentWillUnmount() {
    clearTimeout(this._hideTimeout);
  }

  _hideTimeout: TimeoutID;

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
          this.showAlert();
        }
      }
    });
  };

  toggleAlert = (type: AlertType, message: React.Node | string) => {
    const { isOpen } = this.state;
    if (!isOpen) {
      this.setState({
        isOpen: true,
        alertType: type,
        alertMessage: message,
      });
      this.showAlert();
    } else {
      this.hideAlert();
    }
  };

  showAlert = () => {
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
    ]).start(() => {
      this._hideTimeout = setTimeout(() => this.hideAlert(), DISPLAY_DURATION);
    });
  };

  hideAlert = () => {
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

  render() {
    const { style } = this.props;
    const { translateY, layout, opacity, alertType, alertMessage } = this.state;

    let backgroundColor;
    switch (alertType) {
      case 'error': {
        backgroundColor = '#D21C1C';
        break;
      }
      case 'warning': {
        backgroundColor = '#F9971E';
        break;
      }
      case 'success': {
        backgroundColor = '#46B655';
        break;
      }
      default: {
        backgroundColor = '#F9971E';
      }
    }

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
        <Animated.View
          style={[
            styles.container,
            {
              opacity: opacity.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0, 0.2, 1],
              }),
            },
          ]}
        >
          <Text style={[styles.content]}>{alertMessage}</Text>
        </Animated.View>
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
