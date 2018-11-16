// @flow

import * as React from 'react';
import { TextInput as RNTextInput, View } from 'react-native';

import { StyleSheet } from '..';
import FormLabel from './FormLabel';

type Props = {
  +size?: 'small' | 'normal',
  +placeholder?: string,
  +value?: string,
  +disabled?: boolean,
  +onFocus?: () => void | Promise<any>,
  +onBlur?: () => void | Promise<any>,
  required?: boolean,
  +label: string,
};

type State = {
  isFocused: boolean,
};

const colors = {
  colorTextInputDisabled: '#bac7d5',
  colorTextInput: '#46515e',
  borderColorInput: '#bac7d5',
  colorPlaceholderInput: '#bac7d5',
  borderColorInputFocus: '#0176D2',
};

const getFontSize = size => (size === 'small' ? 14 : 14);
const getHeight = size => (size === 'small' ? 32 : 44);
const getPadding = size => (size === 'small' ? 12 : 12);
const getColor = disabled =>
  disabled ? colors.colorTextInputDisabled : colors.colorTextInput;
const getBorderColor = isFocused =>
  isFocused ? colors.borderColorInputFocus : colors.borderColorInput;

class TextInput extends React.Component<Props, State> {
  state = {
    isFocused: false,
  };

  toggleFocus = () => {
    this.setState(state => ({
      isFocused: !state.isFocused,
    }));
  };

  render() {
    const {
      placeholder,
      size = 'normal',
      value,
      disabled,
      onFocus,
      onBlur,
      label,
      required,
    } = this.props;
    const { isFocused } = this.state;
    return (
      <View>
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
              paddingHorizontal: getPadding(size),
              lineHeight: getHeight(size),
              borderColor: getBorderColor(isFocused),
            },
          ]}
        >
          <RNTextInput
            onFocus={() => {
              this.toggleFocus();
              onFocus && onFocus();
            }}
            onBlur={() => {
              this.toggleFocus();
              onBlur && onBlur();
            }}
            placeholderTextColor={colors.colorPlaceholderInput}
            editable={!disabled}
            placeholder={placeholder}
            value={value}
            style={[
              {
                fontSize: getFontSize(size),
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
  },
});

export default TextInput;
