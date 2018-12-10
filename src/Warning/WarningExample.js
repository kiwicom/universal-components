// @flow

import * as React from 'react';
import { View } from 'react-native';

import Warning from './Warning';
import { Button } from '../Button';
import StyleSheet from '../PlatformStyleSheet';

type Props = {|
  +type: 'error' | 'warning' | 'success',
  +title: React.Node | string,
  +message: React.Node | string,
|};
export default class WarningExample extends React.Component<Props> {
  componentDidMount() {
    this.renderWarning();
  }

  renderWarning = () => {
    const { type, title, message } = this.props;
    this.warning && this.warning.toggleWarning(type, title, message);
  };

  refToWarning = (ref: ?Warning) => {
    this.warning = ref;
  };

  noop = () => {};

  warning: ?Warning;

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.renderWarning}>Press</Button>
        <Warning ref={this.refToWarning} onDismiss={this.noop} />
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
