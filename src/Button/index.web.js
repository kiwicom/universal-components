// @flow

import * as React from 'react';
import Icon from '@kiwicom/react-native-orbit-icons';

import type { ButtonType } from './ButtonTypes';

import ButtonInner from './ButtonInner';

type Props = {|
  +children: React.Node,
  +width?: number,
  +onPress: () => void,
  +disabled?: boolean,
  +type?: ButtonType,
  +leftIcon?: React.Element<typeof Icon> | null,
  +rightIcon?: React.Element<typeof Icon> | null,
  +testID?: string,
  +sublabel?: React.Node,
  +href?: string,
  +block?: boolean,
|};

export default function Button({
  onPress,
  disabled = false,
  type: originalType = 'primary',
  width,
  testID,
  children,
  leftIcon,
  rightIcon,
  href,
  block,
}: Props) {
  const buttonInnerProps = {
    disabled,
    type: originalType,
    testID,
    children,
    leftIcon,
    rightIcon,
  };

  const disabledStyle = disabled
    ? { pointerEvents: 'none', cursor: 'initial' }
    : { pointerEvents: 'auto', cursor: 'pointer' };

  const displayBlock = block
    ? { display: 'block', width: '100%' }
    : { display: 'inline-block', width: width || 'inherit' };

  if (href) {
    return (
      <a
        testID={testID}
        href={href}
        style={{
          border: 0,
          padding: 0,
          textDecoration: 'none',
          ...displayBlock,
          ...disabledStyle,
        }}
      >
        <ButtonInner {...buttonInnerProps} />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onPress}
      testID={testID}
      disabled={disabled}
      style={{
        border: 0,
        padding: 0,
        textDecoration: 'none',
        ...displayBlock,
        ...disabledStyle,
      }}
    >
      <ButtonInner {...buttonInnerProps} />
    </button>
  );
}
