// @flow

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import 'loki/configure-react-native';
import app from '../app.json';

// $FlowFixMe story-loader is generated by react-native-story-loader
import { loadStories } from './story-loader'; //eslint-disable-line

import './rn-addons';

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUI = getStorybookUI({ port: 7007, host: 'localhost' });

class StorybookUIHMRRoot extends React.Component<{}> {
  render() {
    return <StorybookUI />;
  }
}

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you can safely remove this line.
AppRegistry.registerComponent(app.name, () => StorybookUI);

export default StorybookUIHMRRoot;
