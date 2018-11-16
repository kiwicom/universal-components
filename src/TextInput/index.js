// @flow

import * as React from 'react';
import { TextInput as RNTextInput, View, Text } from 'react-native';

import { StyleSheet } from '..';
import FormLabel from './FormLabel';

type Props = {|
  +size?: 'small' | 'normal',
  +placeholder?: string,
  +value?: string,
  +disabled?: boolean,
  +onFocus?: () => void | Promise<any>,
  +onBlur?: () => void | Promise<any>,
  +required?: boolean,
  +label: string,
  +prefix?: React$Node,
|};

type State = {
  isFocused: boolean,
};

const colors = {
  colorTextInputDisabled: '#bac7d5',
  colorTextInput: '#46515e',
  borderColorInput: '#bac7d5',
  colorPlaceholderInput: '#bac7d5',
  borderColorInputFocus: '#0176D2',
  colorIconInput: '#bac7d5',
  colorTextInputPrefix: '#7f91a8',
};

const getHeight = size => (size === 'small' ? 32 : 44);
const getColor = disabled =>
  disabled ? colors.colorTextInputDisabled : colors.colorTextInput;
const getBorderColor = isFocused =>
  isFocused ? colors.borderColorInputFocus : colors.borderColorInput;

const Prefix = ({ children }) => {
  if (typeof children === 'string') {
    return (
      <View style={styles.prefix}>
        <Text style={styles.textInputPrefix}>{children}</Text>
      </View>
    );
  }
  return <View style={styles.prefix}>{children}</View>;
};

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
    } = this.props;
    const { isFocused } = this.state;
    return (
      <View>
        {/* Need to add support for inlineLabel */}
        {label && (
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
          {/* Need to add support for icon prefix */}
          {prefix && <Prefix>{prefix}</Prefix>}
          <RNTextInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            placeholderTextColor={colors.colorPlaceholderInput}
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
  prefix: {
    color: colors.colorIconInput,
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 12,
  },
  textInputPrefix: {
    color: colors.colorTextInputPrefix,
  },
});

export default TextInput;
