// @flow

import * as React from 'react';
import { View } from 'react-native';

import Notification from './Notification';
import { Button } from '../Button';
import StyleSheet from '../PlatformStyleSheet';

type Props = {|
  +notificationStyle: 'error' | 'warning' | 'success',
  +notificationType: 'alert' | 'warning',
  +title?: React.Node | string,
  +message: React.Node | string,
  +onDismiss?: () => void,
|};
export default class AlertExample extends React.Component<Props> {
  componentDidMount() {
    this.renderAlert();
  }

  renderAlert = () => {
    const { notificationStyle, title, message } = this.props;
    this.notification &&
      this.notification.toggleAlert(notificationStyle, title, message);
  };

  refToAlert = (ref: ?Notification) => {
    this.notification = ref;
  };

  notification: ?Notification;

  render() {
    const { notificationType, onDismiss } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={this.renderAlert}>Press</Button>
        <Notification
          ref={this.refToAlert}
          notificationType={notificationType}
          onDismiss={onDismiss}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
