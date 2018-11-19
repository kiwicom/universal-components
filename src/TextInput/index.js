// @flow

import * as React from 'react';
import { TextInput as RNTextInput, View, Text } from 'react-native';

import { StyleSheet } from '..';
import defaultTokens from '../defaultTokens';
import FormLabel from './FormLabel';

type Props = {|
  +size?: 'small' | 'normal',
  +placeholder?: string,
  +value?: string,
  +disabled?: boolean,
  +required?: boolean,
  +inlineLabel?: boolean,
  +label: string,
  +prefix?: React$Node,
  +onFocus?: () => void | Promise<any>,
  +onBlur?: () => void | Promise<any>,
  +onChange?: () => void | Promise<any>,
|};

type State = {
  isFocused: boolean,
};

const getHeight = size => (size === 'small' ? 32 : 44);
const getIconSize = size => (size === 'small' ? 16 : 24);
const getColor = disabled =>
  disabled
    ? defaultTokens.orbit.colorTextInputDisabled
    : defaultTokens.orbit.colorTextInput;
const getBorderColor = isFocused =>
  isFocused
    ? defaultTokens.orbit.borderColorInputFocus
    : defaultTokens.orbit.borderColorInput;

const Prefix = ({ children, size }) => {
  if (typeof children === 'object' && children.props) {
    const icon = {
      ...children,
      props: {
        ...children.props,
        color: defaultTokens.orbit.colorIconInput,
        size: getIconSize(size),
      },
    };
    return <View style={styles.prefix}>{icon}</View>;
  }
  return (
    <View style={styles.prefix}>
      <Text style={styles.textInputPrefix}>{children}</Text>
    </View>
  );
};

const InlineLabel = ({ children }) => (
  <View style={styles.inlineLabel}>{children}</View>
);

class TextInput extends React.Component<Props, State> {
  state = {
    isFocused: false,
  };

  toggleFocus = () => {
    this.setState(state => ({
      isFocused: !state.isFocused,
    }));
  };

  onFocus = () => {
    const { onFocus } = this.props;
    this.toggleFocus();
    return onFocus && onFocus();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    this.toggleFocus();
    return onBlur && onBlur();
  };

  render() {
    const {
      placeholder,
      size = 'normal',
      value,
      disabled,
      label,
      required,
      prefix,
      onChange,
      inlineLabel,
    } = this.props;
    const { isFocused } = this.state;
    return (
      <View>
        {label && !inlineLabel && (
          <FormLabel filled={!!value} required={required}>
            {label}
          </FormLabel>
        )}
        <View
          style={[
            styles.inputContainer,
            {
              height: getHeight(size),
              borderColor: getBorderColor(isFocused),
            },
          ]}
        >
          {prefix && <Prefix size={size}>{prefix}</Prefix>}
          {label && inlineLabel && (
            <InlineLabel>
              <FormLabel filled={!!value} inlineLabel required={required}>
                {label}
              </FormLabel>
            </InlineLabel>
          )}
          <RNTextInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={onChange}
            placeholderTextColor={defaultTokens.orbit.colorPlaceholderInput}
            editable={!disabled}
            placeholder={placeholder}
            value={value}
            style={[
              styles.textInput,
              {
                color: getColor(disabled),
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 12,
  },
  textInput: {
    width: '100%',
    fontSize: 14,
    web: {
      outline: 'none',
    },
  },
  inlineLabel: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 12,
  },
  prefix: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 12,
  },
  textInputPrefix: {
    color: defaultTokens.orbit.colorTextInputPrefix,
  },
});

export default TextInput;
