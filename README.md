# Universal Components
Proof of concept for universal components.
Based on [react-native-web](https://github.com/necolas/react-native-web).

## Usage

```bash
yarn install @kiwicom/universal-components
# Only for React Native
react-native link @kiwicom/universal-components
```

Note: For web projects, you need to ensure you support the `.web.js` extension. [create-react-app](https://github.com/facebook/create-react-app/blob/6364bbf6dc8244508398f934d0882f05e0cb5dcc/packages/react-scripts/config/paths.js#L52) already supports it by default.

## Development
### Desktop
```bash
yarn storybook
```

### Mobile

```bash
// This command is optional in order to control the app via your browser
yarn storybook-native
```

After running storybook-native, you can navigate to http://localhost:7007 which will make the experience of working
with the app easier. Then, you can run it either on iOS or Android:

#### iOS

```bash
yarn ios
```

#### Android
```bash
yarn android
```
