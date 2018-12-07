// @flow

import * as React from 'react';
import { View } from 'react-native';

import Alert from './Alert';
import { Button } from '../Button';
import StyleSheet from '../PlatformStyleSheet';

type Props = {|
  +type: 'error' | 'warning' | 'success',
  +message: React.Node | string,
|};
export default class AlertExample extends React.Component<Props> {
  componentDidMount() {
    this.renderAlert();
  }

  renderAlert = () => {
    const { type, message } = this.props;
    this.alert && this.alert.toggleAlert(type, message);
  };

  refToAlert = (ref: ?Alert) => {
    this.alert = ref;
  };

  alert: ?Alert;

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.renderAlert}>Press</Button>
        <Alert ref={this.refToAlert} />
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
